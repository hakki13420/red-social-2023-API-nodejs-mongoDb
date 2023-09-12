const mongoose = require('mongoose')
const user = require('./user')

const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    require: true
  },
  picture: {
    type: String,
    default: ''
  },
  likes: {
    type: Array,
    default: []
  },
  comments: {
    type: Array,
    default: []
  }

}, {
  timestamp: true
})

module.exports = mongoose.model('Post', postSchema)
