const { Pool } = require('pg');
const config = require('../utils/config');

const CONNECTION = {
  user: config.PG_USER,
  host: 'localhost',
  database: config.PG_DB_NAME,
  password: config.PG_PASSWORD,
  port: config.PG_PORT,
  ssl: false,
};

const logQuery = (statement, params) => {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4,24);
  console.log(formattedTimeStamp, statement, params);
}

module.exports = {
  async dbQuery(statement, ...params) {
    let pool = new Pool(CONNECTION);

    await pool.connect();
    logQuery(statement, params);
    let result = await pool.query(statement, params);
    console.log('pg query returns:', result.rows);
    pool.end();
    return result
  }
};
