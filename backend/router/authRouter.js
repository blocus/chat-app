const express = require('express')
const router = express.Router()
const User = require('../model/userModel')

router.post('/register', (req, res) => {
  const newUser = new User(req.body)

  newUser
    .save()
    .then(user => {
      user.generateWelcomeEmail()
      return res.status(201).send({
        refresh_token: user.generateRefreshToken(),
        ...user.generateAccessToken(),
      })
    })
    .catch(err => res.status(422).send(err))
})

router.get('/', (_, res) => {
  res.send('Hello from auth')
})

module.exports = router
