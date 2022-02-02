const requestRouter = require('express').Router()
const postgres = require('../db/postgres');


// home page
requestRouter.get('/', (request, response) => {

  // TODO serve frontend
  response.send('Hello');
});


// add a request to the databases
requestRouter.post('/r/:hash', (request, response) => {

  // retrieve hash string from URL
  const hash = request.params.hash;

  // query posgres for all entries
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

});

module.exports = requestRouter;
