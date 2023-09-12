const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports.updateUser = async (req, res) => {
  if (req.body.id === req.params.id || req.body.isAdmin) {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
      }
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      })
      return res.status(200).json('user updated')
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json('invalid credential to update this user')
  }
}

module.exports.removeUser = async (req, res) => {
  if (req.params.id === req.body.id || req.body.isAdmin) {
    try {
      await User.findByIdAndRemove(req.params.id)
      return res.status(200).json('user removed')
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json('you havent credential for remove this user')
  }
}

module.exports.followUser = async (req, res) => {
  if (req.params.id === req.body.id) {
    return res.status(400).json('error! you cant follow your self')
  } else {
    try {
      const userFollowed = await User.findById(req.params.id)
      const userFollower = await User.findById(req.body.id)
      if (!userFollowed || !userFollower) return res.status(400).json('invalid parameters')
      if (userFollowed.followers.includes(req.body.id)) return res.status(400).json('you are already in followers list')
      await userFollowed.updateOne({ $push: { followers: req.body.id } })
      await userFollower.updateOne({ $push: { followings: req.params.id } })
      return res.status(200).json('follow action done!')
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

module.exports.unfollowUser = async (req, res) => {
  if (req.params.id === req.body.id) return res.status(400).json('you cant unfollow you self')
  try {
    const followedUser = await User.findById(req.params.id)
    const followerUser = await User.findById(req.body.id)
    if (!followedUser || !followerUser) return res.status(400).json('invalid parameters')
    if (!followedUser.followers.includes(req.body.id)) return res.status(400).json('error ! you dont follow this user')
    if (!followerUser.followings.includes(req.params.id)) return res.status(400).json('error ! you dont follow this user')
    await followedUser.updateOne({ $pull: { followers: req.body.id } })
    await followerUser.updateOne({ $pull: { followings: req.params.id } })
    return res.status(200).json('unfollow action done!')
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json('user dont exist')
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
}
