const postgres = require('../db/postgres');
const mongoose = require('mongoose');
const Request = require('../models/request');

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

const testMongo = (req, res, next) => {
  const request = new Request({
    content: 'this is a test',
  });

  request.save().then(result => {
    console.log('test saved');
  });

  Request.find({}).then(result => {
    result.forEach(request => {
      console.log(request.toJSON());
    });
  });
}

exports.createRequest = createRequest;
exports.testMongo = testMongo;
