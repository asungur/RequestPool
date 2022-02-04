const Request = require('../models/request');

module.exports = class MongoPersistence {
  constructor(name) {
    this.name = name;
  }

  // may want to grab by the the request's object id in mongo instead of the hash_id
  async getRequests(hash_id) {
    const results = await Request.find({ 'content.hash': hash_id })

    if (results.length === 0) {
      console.log("No requests have been made to this location")
    }
    return results;
  }

  async createRequest(requestContent) {
    const newRequest = new Request(requestContent);

    let result = await newRequest.save();

    if (!result._id) {
      console.log("Error: content wasn't saved!");
    }
    return result._id.toString();
  }
}
