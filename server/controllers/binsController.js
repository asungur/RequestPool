// const Bin = require('../models/bin');
const postgres = require('../db/postgres');

const getBin = (req, res, next) => {
  const hash = req.params.hash;
  // query posgres (move this to a model and use promises here)
  postgres.query('SELECT * FROM test WHERE hash = $1', [hash], (error, results) => {
    if (error) {
      throw error;
    }
    // send JSON to the frontend
    response.status(200).json(results.rows);
  });
}

const createBin = (req, res, next) => {
  const currentDate = new Date().toLocaleString();
  // call hash function
  // check postgres for string (move this to a model and use promises here)
  postgres.query('SELECT * FROM test WHERE hash = $1', [hash], (error, results) => {
    if (error) {
      throw error;
    }
  });
}

exports.getBin = getBin;
exports.createBin = createBin;
