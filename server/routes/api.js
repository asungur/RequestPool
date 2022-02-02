const router = require('express').Router();

router.get('/', (request, response) => {
  response.send('Hello');
});

router.get('/r/:hash', (request, response) => {
  const hash = request.params.hash;
  response.send(`${hash}`);
});

module.exports = router;
