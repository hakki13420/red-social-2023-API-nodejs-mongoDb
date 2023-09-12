const { removePost, getPost, updatePost, getPosts, addPost, likePost } = require('../controllers/post')

const router = require('express').Router()

router.post('/', addPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.get('/all/:id', getPosts)
router.delete('/:id', removePost)
router.post('/like/:id', likePost)

module.exports = router
