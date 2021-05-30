const mongoose = require('mongoose')
const { Schema } = mongoose
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
const expiresIn = 15 * 60
const emailre =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const UserSchema = Schema({
  username: { type: String, required: true, unique: true, set: v => v.toLowerCase() },
  password: { type: String, required: true, set: p => bcryptjs.hashSync(p, 12) },
  is_verified_email: { type: Boolean, default: false },
  name: { type: String },
  last: { type: String },
  verification_token: { type: String },
  avatar: { type: String },
  email: { type: String, unique: true, set: v => v.toLowerCase(), validate: v => emailre.test(v) },
})

UserSchema.methods.verifyPassword = function (password) {
  return bcryptjs.compare(password, this.password)
}

UserSchema.methods.toJSON = function () {
  return {
    id: this._id,
    username: this.username,
    name: this.name,
    last: this.last,
    avatar: this.avatar,
    email: this.email,
  }
}

UserSchema.methods.refreshToken = function (refresh_token) {
  // TODO : I should veriy if token exists in redis database by when i will have time i will do it
  return jwt.verify(refresh_token, JWT_REFRESH_SECRET, async (err, decoded) => {
    if (err) return { status: 401 }
    const userId = decoded.id
    return mongoose
      .model('User', UserSchema)
      .findById({ id: userId })
      .then(user => {
        if (user) return { status: 200, jwt: user.generateAccessToken() }
        return { status: 401 }
      })
  })
}

UserSchema.methods.generateAccessToken = function () {
  return {
    user: this.toJSON(),
    expires_in: expiresIn,
    token_type: 'Bearer',
    access_token: jwt.sign(this.toJSON(), JWT_ACCESS_SECRET, { expiresIn }),
  }
}

UserSchema.methods.generateRereshToken = function () {
  return jwt.sign(this.toJSON(), JWT_REFRESH_SECRET)
}

module.exports = mongoose.model('User', UserSchema)
