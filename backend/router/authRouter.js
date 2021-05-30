const express = require('express')
const router = express.Router()
const User = require('../model/userModel')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET

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

router.get('/user-info', (req, res) => {
  const { authorization } = req.headers
  let token = authorization.split(' ')
  if (token.length !== 2) return res.status(403).send()
  if (token[0] !== 'Bearer') return res.status(403).send()
  token = token[1]

  var decoded = jwt.verify(token, JWT_ACCESS_SECRET)
  User.findById(decoded.id)
    .then(user => {
      if (user) {
        return res.status(201).send(user.generateAccessToken())
      }
      return res.status(401).send()
    })
    .catch(() => res.status(500).send())
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
