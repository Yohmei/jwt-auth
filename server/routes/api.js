const mongoose = require('mongoose')
const router = require('express').Router()
const User = mongoose.model('User')
const passport = require('passport')
const utils = require('../lib/utils')

router.get('/api/test', (req, res) => {
  res.status(200).send({ message: `You have visited the test route` })
})

router.get('/api/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ success: false, msg: 'could not find user' })
      }
      res.status(200).json({ success: true, user_name: user.name })
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/api/sign-up', (req, res) => {
  const { name, username, password } = req.body
  const salt_hash = utils.genPassword(password)

  const salt = salt_hash.salt
  const hash = salt_hash.hash

  const new_user = new User({
    name: name,
    username: username,
    hash,
    salt,
  })

  new_user
    .save()
    .then((user) => {
      const jwt = utils.issueJWT(user)
      res.json({ success: true, user, token: jwt.token, expires: jwt.expires })
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/api/sign-in', (req, res, next) => {
  const { username, password } = req.body

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ success: false, msg: 'could not find user' })
      }

      // Function defined at bottom of app.js
      const is_valid = utils.validPassword(password, user.hash, user.salt)

      if (is_valid) {
        const token_obj = utils.issueJWT(user)

        res.status(200).json({ success: true, user, token: token_obj.token, expires: token_obj.expires })
      } else {
        res.status(401).json({ success: false, msg: 'you entered the wrong password' })
      }
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
