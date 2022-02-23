package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jasonlvhit/gocron"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// =====================================
func createPostgresConnection() *sql.DB {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	db, err := sql.Open("postgres", os.Getenv("POSTGRES_STR_VPS"))
	if err != nil {
		panic(err)
	}
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("Successfully connected!")
	return db
}

func createMongoConnection() *mongo.Client {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	clientOptions := options.Client().ApplyURI(os.Getenv("VPS_MONGODB_URI"))
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}
	return client
}

// =====================================

func deleteOldBins() int64 {
	db := createPostgresConnection()
	defer db.Close()
	sqlStatement := `DELETE FROM bins WHERE DATE(date_time) < DATE(NOW() - INTERVAL 2 DAY)`
	res, err := db.Exec(sqlStatement)
	if err != nil {
		log.Fatalf("Unable to execute the query. %v", err)
	}
	rowsAffected, err := res.RowsAffected()
	if err != nil {
		log.Fatalf("Error while checking the affected rows. %v", err)
	}
	fmt.Printf("Total rows/record affected %v", rowsAffected)
	return rowsAffected
}

func deleteOldRequests() {
	client := createMongoConnection()
	defer client.Disconnect(context.TODO())
	// GET THE COLLECTION FIRST
	collection := client.Database("test").Collection("requests")
	dateTreshold := time.Now().Add(-48 * time.Hour).Format(time.RFC3339)
	// Check collection if needed
	// curr, _ := collection.Find(context.TODO(), bson.M{})
	// var requests []bson.M
	// if err := curr.All(context.TODO(), &requests); err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println(requests)
	f := bson.M{"createdAt": bson.M{"$gt": dateTreshold}}
	results, err := collection.DeleteMany(context.TODO(), f)
	if err != nil {
		log.Fatalf("Error deleting outdated requests")
	}
	fmt.Println("Outdated records are deleted", results)
}

func deleteOldData() {
	deleteOldBins()
	deleteOldRequests()
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	gocron.Every(1).Day().Do(deleteOldData)
	<-gocron.Start()
}
