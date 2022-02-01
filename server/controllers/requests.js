const requestRouter = require('express').Router()
const request = require('../models/request')

requestRouter.get('/', async (request, response) => {
  // const notes = await Note.find({})
  response.json(notes.map(request => request.toJSON()))
})

module.exports = requestRouter
