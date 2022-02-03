// const Bin = require('../models/bin');
const postgres = require('../models/bin');

const getBin = (req, res, next) => {
  const hash = req.params.hash;
  // query posgres (move this to a model and use promises here)
  postgres.query('SELECT * FROM bins WHERE hash_id = $1', [hash], (error, results) => {
    if (error) {
      throw error;
    }
    // send JSON to the frontend
    res.status(200).json(results.rows);
  });
}

const createBin = (req, res, next) => {
  const timeNow = new Date()
  const createTime = timeNow.getTime()

  // this should give a unique hash value every time for the next 100 years or so
  // may not even need to query the DB first but we probably should
  const hash = createTime.toString(36)
  const updateTime = timeNow.setHours(timeNow.getHours() + 48)

  // check postgres for string (move this to a model and use promises here)
  postgres.query('SELECT * FROM bins WHERE hash_id = $1', [hash], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.rows.length != 0) {
      res.status(404)
    }
  });

  // (move this to a model and use promises here)
  postgres.query('INSERT into bins (hash_id, created_at, update_at) VALUES ($1, to_timestamp($2 / 1000.0), to_timestamp($3 / 1000.0))', [hash, createTime, updateTime], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).json({ hash });
  })
}

exports.getBin = getBin;
exports.createBin = createBin;
