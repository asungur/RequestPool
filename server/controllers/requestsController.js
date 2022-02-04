const createRequest = async (req, res, next) => {
  const hash = req.params.hash;

  let bin = await res.locals.pgStore.loadBin(hash);

  if (!bin) {
    res.status(404).end()
    return
  }

  // create MongoDB data
  const content = {
    hash: hash, // added hash so I can grab all requests that have this hash value
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

const testMongo = async (req, res, next) => {
  let requestId = await res.locals.mongoStore.createRequest({ content: 'this is a test' });
  console.log('mongo test connection returns:', requestId);
  if (!requestId) {
    console.log("something went wrong");
  } else {
    console.log("test saved");
  }
  return res.status(200).json({ requestId });
}

exports.createRequest = createRequest;
exports.testMongo = testMongo;
