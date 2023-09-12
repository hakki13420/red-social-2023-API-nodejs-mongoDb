const { updateUser, removeUser, followUser, unfollowUser, getUser } = require('../controllers/user')

const router = require('express').Router()

router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', removeUser)
router.post('/follow/:id', followUser)
router.post('/unfollow/:id', unfollowUser)

module.exports = router
