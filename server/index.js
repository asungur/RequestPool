const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const app = express();
const routes = require('./routes/api');
const middleware = require('./utils/middleware');
const PgPersistence = require('./db/pg-persistence');
const MongoPersistence = require('./db/mongo-persistence');

app.use(express.static('build'))
app.use(express.json());
app.use(morgan('tiny'));
app.use(middleware.requestLogger)

app.use((_, res, next) => {
  res.locals.pgStore = new PgPersistence('requestpoolpg');
  res.locals.mongoStore = new MongoPersistence('requestpoolmongo');
  next();
});

app.use('/', routes);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
