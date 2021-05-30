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

const generateRandomString = () => 'thisShouldBeARandomString'

const UserSchema = Schema(
  {
    username: { type: String, required: true, unique: true, set: v => v.toLowerCase() },
    password: { type: String, required: true, set: p => bcryptjs.hashSync(p, 12) },
    is_verified_email: { type: Boolean, default: true },
    name: { type: String, default: '' },
    last: { type: String, default: '' },
    verification_token: { type: String },
    avatar: { type: String, default: '/assets/images/default_avatar.png' },
    email: {
      type: String,
      unique: true,
      set: v => v.toLowerCase(),
      validate: v => emailre.test(v),
    },
    status: { type: String, enum: ['C', 'B', 'D'] },
  },
  { timestamps: true }
)

UserSchema.methods.verifyPassword = function (password) {
  return bcryptjs.compareSync(password, this.password)
}

UserSchema.methods.toJSON = function () {
  return {
    id: this._id,
    username: this.username,
    fullname: this.fullName,
    name: this.name,
    last: this.last,
    avatar: this.avatar,
    email: this.email,
    status: this.status,
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

UserSchema.virtual('fullName').get(function () {
  if (this.name && this.last) return this.name + ' ' + this.last
  return this.username
})

UserSchema.methods.generateAccessToken = function () {
  return {
    user: this.toJSON(),
    expires_in: expiresIn,
    token_type: 'Bearer',
    access_token: jwt.sign(this.toJSON(), JWT_ACCESS_SECRET, { expiresIn }),
  }
}

UserSchema.methods.generateWelcomeEmail = function () {
  this.verification_token = generateRandomString()
  this.save()
  return true
}

UserSchema.methods.generateforgotPasswordEmail = function () {
  this.verification_token = generateRandomString()
  this.save()
  return true
}

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(this.toJSON(), JWT_REFRESH_SECRET)
}

module.exports = mongoose.model('User', UserSchema)
