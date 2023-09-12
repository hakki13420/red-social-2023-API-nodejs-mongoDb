const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 10,
    max: 50
  },
  username: {
    type: String,
    require: true,
    min: 4,
    max: 15
  },
  email: {
    type: String,
    require: true,
    max: 50
  },
  password: {
    type: String,
    require: true,
    min: 6
  },
  profilePicture: {
    type: String,
    default: ''
  },
  coverPicture: {
    type: String,
    default: ''
  },
  followers: {
    type: Array,
    default: []
  },
  followings: {
    type: Array,
    default: []
  },
  city: {
    type: String,
    max: 50
  },
  isAdmin: {
    type: Boolean,
    defalt: false
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
