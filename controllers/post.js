const Post = require('../models/post')
const User = require('../models/user')

module.exports.addPost = async (req, res) => {
  try {
    const post = await Post.create(req.body)
    return res.status(201).json(post)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json('post dont exist')
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post.userId.equals(req.body.userId)) return res.status(403).json('you havent credential to update this post')
    const updatedPost = await Post.updateOne({ $set: req.body })
    return res.status(200).json(updatedPost)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.getPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const postsUser = await Post.find({ userId: req.params.id })
    console.log('postUser', postsUser)
    const postsFriends = await Promise.all(
      user.followings.map(friend => Post.find({ userId: friend }))
    )
    console.log('postFriends', postsFriends)

    return res.status(200).json(postsUser.concat(...postsFriends))
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.removePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post.userId.equals(req.body.userId)) return res.status(403).json('you havent credentials to remove this post')
    await post.deleteOne()
    return res.status(200).json('post removed')
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json('post dont exist')
    console.log('post', post)
    if (post.userId.equals(req.body.userId)) return res.status(400).json('you cant like your posts')
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
      return res.status(200).json('post liked')
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      return res.status(200).json('post disliked')
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}
