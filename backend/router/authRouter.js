const express = require('express')
const router = express.Router()
const User = require('../model/userModel')

router.post('/register', (req, res) => {
  //   const { username, email, password, confirm_password } = req.body
  const newUser = new User(req.body)
  newUser
    .save()
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err))
})

router.get('/', (_, res) => {
  res.send('Hello from auth')
})

module.exports = router
