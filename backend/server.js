const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const port = process.env.PORT || 5000
const app = express()
const cors = require('cors')
const router = require('./router')
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const jwt = require('jsonwebtoken')
const User = require('./model/userModel')
app.use(cors())
app.use(express.json())
app.use(router)

const mongoose = require('mongoose')
require('dotenv').config()
const mongURI = process.env.MONGO_URI
const mongoConfig = require('./mongo_config.json')

const server = http.createServer(app)
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['authorization'],
    credentials: true,
  },
})

io.on('connection', async socket => {
  let token = socket.handshake.headers.authorization
  token = token.split(' ')
  if (token.length !== 2) return
  if (token[0] !== 'Bearer') return
  token = token[1]

  var decoded = jwt.verify(token, JWT_ACCESS_SECRET, function (err, decoded) {
    if (err) {
      return null
      /*
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
          }
        */
    }
    return decoded
  })
  if (decoded === null) return

  const user = await User.findById(decoded.id)
    .then(user => {
      const status = 'C'
      user.status = status
      user.save()
      socket.emit('USER_STATUS_UPDATED', status)
      io.sockets.emit('BROADCAST_MY_STATUS', { other_id: user._id, status })
      return user
    })
    .catch(() => null)

  socket.on('USER_STATUS_UPDATE', status => {
    const oldStatus = user.status
    user.status = status
    user
      .save()
      .then(() => {
        io.sockets.emit('BROADCAST_MY_STATUS', { other_id: user._id, status })
        socket.emit('USER_STATUS_UPDATED', status)
      })
      .catch(() => {
        io.sockets.emit('BROADCAST_MY_STATUS', { other_id: user._id, status: oldStatus })
        socket.emit('USER_STATUS_UPDATED', oldStatus)
      })
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
  })

  socket.on('disconnect', () => {
    const status = 'D'
    user.status = status
    user.save()
    io.sockets.emit('BROADCAST', { other_id: user._id, status })
  })
})

mongoose
  .connect(mongURI, mongoConfig)
  .then(() => console.log('Connection to database done'))
  .catch(err => console.log('Connection to database failed', err))

server.listen(port, () => {
  console.log(`server is running @ http://127.0.0.1:${port}`)
})
