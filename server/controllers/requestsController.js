const postgres = require('../db/postgres');
const mongoose = require('mongoose');
const Request = require('../models/request');

const createRequest = (req, res, next) => {
  // retrieve hash string from json body
  const hash = req.body.hash;
  // query posgres for all entries (move this to a model)
  postgres.query('SELECT * FROM test WHERE hash = $1', [hash], (error, results) => {
    if (error) {
      throw error;
    }

    // if hash isn't in database, return 404
    if (results.length === 0) {
      response.status(404);
    }

    // create MongoDB data
    const content = { 
      url: req.url,
      method: req.method,
      body: req.body, 
      headers: req.headers 
    };

    const request = new Request({ content });

    // send to MongoDB
    request.save().then(result => {
      console.log('test saved');
      // get ID of mongo record
      const mongoID = result._id.toString();

      // add to requests table in postgres
      postgres.query('INSERT INTO requests (bin_id, mongo_id) VALUES ($1, $2)', [hash, mongoID], (error, results) => {
        if (error) {
          throw error;
        }

        res.sendStatus(200);
      });
    });
  });
}

const testMongo = (req, res, next) => {
  /*
  const request = new Request({
    content: 'this is a test',
  });

  request.save().then(result => {
    console.log('test saved');
  });

  Request.findById('61fb44b6448c5276b4a504b9').then(result => {
    console.log(result.toJSON());
  });
  */
}

exports.createRequest = createRequest;
exports.testMongo = testMongo;
