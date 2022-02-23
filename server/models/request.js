const mongoose = require('mongoose');
const config = require('../utils/config');

console.log('connecting to: ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB: ', error.message);
  })

const requestSchema = new mongoose.Schema({
  content: {}
}, {timestamps: true});

requestSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Request', requestSchema);
