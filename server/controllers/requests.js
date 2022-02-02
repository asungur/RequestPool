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
  postgres.query('SELECT * FROM test WHERE hash = $1', [hash], (error, result) => {
    if (error) {
      throw error;
    }

    // send JSON to the frontend
    response.status(200).json(results.rows);
  });

});

module.exports = requestRouter;
