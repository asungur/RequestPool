// const apiRouter = require('express').Router();
const express = require('express');
const router = express.Router();
const binsController = require('../controllers/binsController');
const requestsController = require('../controllers/requestsController');


// show requests to a bin
router.get('/bins/:hash', binsController.getBin);

// create a new bin
router.post('/bins', binsController.createBin);

// temporary, will not be used by the API
router.get('/', requestsController.testMongo);

// delete a request from a bin
router.delete('/bins/:hash_id/:request_id', requestsController.deleteRequest)

// create new record of a request
router.get('/requests/:hash', requestsController.createRequest);
router.post('/requests/:hash', requestsController.createRequest);
router.put('/requests/:hash', requestsController.createRequest);
router.delete('/requests/:hash', requestsController.createRequest);

module.exports = router;
