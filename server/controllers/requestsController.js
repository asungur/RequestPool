const createRequest = async (req, res, next) => {
  const hash = req.body.hash;

  let bin = await res.locals.pgStore.loadBin(hash);

  if (!bin) {
    res.status(404).end()
  }

  // create MongoDB data
  const content = {
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

const testMongo = (req, res, next) => {
  /*
  const request = new Request({
    content: 'this is a test',
  });

  request.save().then(result => {
    console.log('test saved');
  });

  Request.findById('61fb44b6448c5276b4a504b9').then(result => {
    console.log(result.toJSON());
  });
  */
}

exports.createRequest = createRequest;
exports.testMongo = testMongo;
