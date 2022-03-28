const mongoose = require('mongoose')
const router = require('express').Router()
const User = mongoose.model('User')
const passport = require('passport')
const utils = require('../lib/utils')

router.get('/api/test', (req, res) => {
  res.send({ message: `You have visited the test route` })
})

router.post('/api/sign-up', (req, res) => {
  const user = req.body

  new User(user).save((err) => {
    if (err) throw err
    else res.send({ message: 'User saved' })
  })
})

router.post('/api/sign-in', (req, res) => {})

module.exports = router
