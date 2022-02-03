const mongoose = require('mongoose');
const config = require('./utils/config');
const express = require('express');
const app = express();
const routes = require('./routes/api');

app.use(express.json());
app.use('/', routes);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
