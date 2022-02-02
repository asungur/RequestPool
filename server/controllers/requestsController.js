// const Request = require('../models/request');
const postgres = require('../db/postgres');

const createRequest = (req, res, next) => {
  // retrieve hash string from json body
  const hash = request.body.hash;
  // query posgres for all entries (move this to a model)
  postgres.query('SELECT * FROM test WHERE hash = $1', [hash], (error, results) => {
    if (error) {
      throw error;
    }

    // if hash isn't in database, return 404
    if (results.length === 0) {
      response.status(404);
    }

    // if hash is in database, create a record in the database
    postgres.query('', [hash], (error, results) => {
      if (error) {
        throw error;
      }
    });
  });
}

exports.createRequest = createRequest;