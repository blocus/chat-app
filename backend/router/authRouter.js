const express = require('express')
const router = express.Router()
const User = require('../model/userModel')
const isAuth = require('../middlewares/auth')

router.post('/login', (req, res) => {
  const { username, password } = req.body
  User.findOne({ username })
    .then(user => {
      if (user && user.verifyPassword(password)) {
        return res.status(201).send({
          refresh_token: user.generateRefreshToken(),
          ...user.generateAccessToken(),
        })
      }
      return res.status(401).send()
    })
    .catch(() => res.status(500).send())
})

router.get('/user-info', isAuth, (req, res) => {
  return res.status(201).send(req.user.generateAccessToken())
})

router.post('/register', (req, res) => {
  const newUser = new User(req.body)
  newUser
    .save()
    .then(user => {
      user.generateWelcomeEmail()
      return res.status(201).send()
    })
    .catch(err => res.status(422).send(err))
})

router.get('/', (_, res) => {
  res.send('Hello from auth')
})

module.exports = router
