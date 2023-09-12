const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = await User.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    return res.status(201).json(newUser)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(404).json('user dont exit')
    const compare = await bcrypt.compare(req.body.password, user.password)
    if (!compare) return res.status(400).json('false creedential')
    const token = jwt.sign({
      userId: user.id
    },
    process.env.JWT_SECRET
    )
    const { password, ...userWithoutPw } = user
    return res.cookie('accessToken', {
      httpOnly: true,
      maxAge: 1 * 60 * 1000
    }).status(200).json(userWithoutPw)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.logout = (req, res) => {

}
