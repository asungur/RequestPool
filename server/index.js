const mongoose = require('mongoose');
const config = require('./utils/config');
const express = require('express');
const app = express();
const router = require('./routes/api');

app.use('/', router);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
