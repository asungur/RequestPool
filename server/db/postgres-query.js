const { Pool } = require('pg');
const config = require('../utils/config');

const pool = new Pool({
  user: config.PG_USER,
  host: 'localhost',
  database: config.PG_DB_NAME,
  password: config.PG_PASSWORD,
  port: config.PG_PORT,
  ssl: false,
});

const logQuery = (statement, params) => {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4,24);
  console.log(formattedTimeStamp, statement, params);
}

module.exports = {
  poolQuery: (text, ...params) => {
    return pool.query(text, params);
  },
  async dbQuery(statement, ...params) {
    await pool.connect();
    logQuery(statement, params);
    console.log('connected to pg');
    let result = await pool.query(statement, params);
    console.log('pg query returns:', result.rows);
    return result
  }
};
