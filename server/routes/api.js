const apiRouter = require('express').Router();
const postgres = require('../db/postgres');

// show requests to a bin
apiRouter.get('/:hash', (request, response) => {

  // retrieve hash string from URL
  const hash = request.params.hash;

  // query posgres
  postgres.query('SELECT * FROM test WHERE hash = $1', [hash], (error, results) => {
    if (error) {
      throw error;
    }

    // send JSON to the frontend
    response.status(200).json(results.rows);
  });
});

module.exports = apiRouter;
