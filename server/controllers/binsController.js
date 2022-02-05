const hashFunc = require('../lib/hash-generator');

const getBin = async (req, res, next) => {
  const hash = req.params.hash;

  let bin = await res.locals.pgStore.loadBin(hash);
  if (!!bin) {
    let requests = await res.locals.mongoStore.getRequests(hash)
    res.status(200).json(requests)
  } else {
    res.status(404).end()
  }
}

const createBin = async (req, res, next) => {
  let { hash, createTime, updateTime } = hashFunc();

  let bin = await res.locals.pgStore.loadBin(hash);
  if (!!bin) {
    console.log("Record already exists");
    res.status(409).end();
  }

  let result = res.locals.pgStore.createBin(hash, createTime, updateTime);
  if (result) {
    res.status(201).json({ hash });
  }
}

exports.getBin = getBin;
exports.createBin = createBin;
