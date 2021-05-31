const express = require('express')
const isAuth = require('../middlewares/auth')
const router = express.Router()
const User = require('../model/userModel')

router.get('/', isAuth, (req, res) => {
  User.find({ is_verified_email: true })
    .then(data => res.send(data))
    .catch(err => res.status(500).send())
})

module.exports = router
