// const apiRouter = require('express').Router();
const express = require('express');
const router = express.Router();
const binsController = require('../controllers/binsController');
const requestsController = require('../controllers/requestsController');
const path = require('path');

// show requests to a bin
router.get('/bins/:hash', binsController.getBin);

// create a new bin
router.post('/bins', binsController.createBin);

// delete a request from a bin
router.delete('/bins/:request_id', requestsController.deleteRequest)

// create new record of a request
router.get('/requests/:hash', requestsController.createRequest);
router.post('/requests/:hash', requestsController.createRequest);
router.put('/requests/:hash', requestsController.createRequest);
router.delete('/requests/:hash', requestsController.createRequest);

router.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

module.exports = router;
