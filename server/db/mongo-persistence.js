const Request = require('../models/request');

module.exports = class MongoPersistence {
  constructor(name) {
    this.name = name;
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
