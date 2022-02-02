const { Pool } = require('pg');
const config = require('../utils/config');

const pool = new Pool({
  user: config.PG_USER,
  host: 'localhost',
  database: config.PG_DB_NAME,
  password: config.PG_PASSWORD,
  port: config.PG_PORT,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
