const router = require('express').Router();
const postgres = require('../db/postgres');

// home page
router.get('/', (request, response) => {
  // TODO serve frontend
  response.send('Hello');
});


// show requests to a bin
router.get('/r/:hash', (request, response) => {
  // retrieve hash string from URL
  const hash = request.params.hash;

  // query posgres
  postgres.query('SELECT * FROM test WHERE hash = $1', [hash], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json(results.rows);
  });
});


// add a request to the databases
router.post('/r/:hash', (request, response) => {
  // retrieve hash string from URL
  const hash = request.params.hash;

  // query posgres
  postgres.query('', hash, (err, result) => {
  });

});

module.exports = router;
