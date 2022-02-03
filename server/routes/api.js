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

// create new record of a request
router.post('/requests', requestsController.createRequest);

module.exports = router;
