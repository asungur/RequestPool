const mongoose = require('mongoose');
const MongoPersistence = require('../db/mongo-persistence');
const mongoPersistenceInstance = new MongoPersistence('test');
const Request = require('../models/request');

describe('MongoPersistence', () => {
  beforeEach(async () => {
    const requestContent1 = {
      content: {
        hash: 'abcd1234',
        method: 'GET',
        url: '/test',
        body: {},
      },
    };

    const requestContent2 = {
      content: {
        hash: 'xyz123cc',
        method: 'POST',
        url: '/test2',
        body: {},
      },
    };

    const requestContent3 = {
      content: {
        hash: 'xyz123cc',
        method: 'DELETE',
        url: '/test?param=true',
        body: {},
      },
    };

    const newRequest1 = new Request(requestContent1);
    const newRequest2 = new Request(requestContent2);
    const newRequest3 = new Request(requestContent3);
    await newRequest1.save();
    await newRequest2.save();
    await newRequest3.save();
  });

  afterEach(async () => {
    await Request.deleteMany({ 'content.hash': 'abcd1234' });
    await Request.deleteMany({ 'content.hash': 'xyz123cc' });
  });

  test('can retrieve a document with getRequests', async () => {
    const result = await mongoPersistenceInstance.getRequests('abcd1234');
    expect(Array.isArray(result));
    expect(typeof result).toBe('object');
    expect(result.length).toBe(1);
    expect(result[0].content.hash).toBe('abcd1234');
    expect(result[0].content.method).toBe('GET');
    expect(result[0].content.url).toBe('/test');
  });

  test('can retrieve multiple documents with getRequests', async () => {
    const result = await mongoPersistenceInstance.getRequests('xyz123cc');
    expect(Array.isArray(result));
    expect(result.length).toBe(2);
    expect(result[0].content.hash).toBe('xyz123cc');
    expect(result[1].content.hash).toBe('xyz123cc');
  });

  test('can create a request', async () => {
    const newRequest = {
      content: {
        hash: 'abcd1234',
        method: 'GET',
        url: '/test',
        body: {},
      },
    };

    const result = await mongoPersistenceInstance.createRequest(newRequest);
    const retrieved = await Request.find({ 'content.hash': 'abcd1234' });
    expect(typeof result).toBe('string');
    expect(result.length).toBe(24);
    expect(retrieved.length).toBe(2);
  });

  afterAll(() => {
    mongoose.connection.close();
  })
});
