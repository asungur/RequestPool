const path = require('path');

const createRequest = async (req, res, next) => {
  const hash = req.params.hash;
  const inspect = req.query.inspect;

  if (!!inspect) {
    res.sendFile(path.join(__dirname, '../build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
    res.status(201)
    return
  }

  let bin = await res.locals.pgStore.loadBin(hash);

  if (!bin) {
    res.status(404).end()
    return
  }

  const content = {
    hash: hash,
    url: req.url,
    method: req.method,
    body: req.body,
    headers: req.headers
  };
  let requestId = await res.locals.mongoStore.createRequest({ content })

  if (requestId) {
    res.status(201).json({ requestId });
  }
}

const deleteRequest = async (req, res, next) => {
  const request_id = req.params.request_id;

  let deleted = await res.locals.mongoStore.deleteRequest(request_id)

  console.log('Deleted the following entry: ', deleted)
  return res.status(204).end();
}

exports.createRequest = createRequest;
exports.deleteRequest = deleteRequest;
