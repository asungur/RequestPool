const mongoose = require('mongoose');
const config = require('./utils/config');
const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const requestRouter = require('./controllers/requests');

app.use('/api', apiRouter);
app.use('/', requestRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
