const User = require('../model/userModel')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET

const isAuth = (req, res, next) => {
  const { authorization } = req.headers
  let token = authorization.split(' ')
  if (token.length !== 2) return res.status(403).send()
  if (token[0] !== 'Bearer') return res.status(403).send()
  token = token[1]

  var decoded = jwt.verify(token, JWT_ACCESS_SECRET, function (err, decoded) {
    if (err) return null
    return decoded
  })
  if (decoded === null) return res.status(401).send()

  User.findById(decoded.id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else return res.status(401).send()
    })
    .catch(() => res.status(500).send())
}
module.exports = isAuth
