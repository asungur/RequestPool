require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const PG_DB_NAME = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_PG_DB_NAME
  : process.env.PG_DB_NAME

const PG_USER = process.env.PG_USER
const PG_PASSWORD = process.env.PG_PASSWORD
const PG_PORT = process.env.PG_PORT

module.exports = {
  MONGODB_URI,
  PORT,
  PG_DB_NAME,
  PG_USER,
  PG_PASSWORD,
  PG_PORT
}
