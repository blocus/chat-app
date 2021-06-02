const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const port = process.env.PORT || 5000
const app = express()
const fileUpload = require('express-fileupload')
const cors = require('cors')
const router = require('./router')
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const jwt = require('jsonwebtoken')
const User = require('./model/userModel')
const ConversationMember = require('./model/conversationMemberModel')
const Conversation = require('./model/conversationModel')
const Message = require('./model/MessageModel')

app.use(cors())
app.use(fileUpload())
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
    if (err) return null
    return decoded
  })
  if (decoded === null) return

  const user = await User.findById(decoded.id)
    .then(user => {
      const status = 'C'
      user.status = status
      user.save()
      socket.emit('USER_STATUS_UPDATED', status)
      io.sockets.emit('BROADCAST_MY_STATUS', { user_id: user._id, status })
      ConversationMember.find({ userId: user._id })
        .then(data => {
          data.forEach(conv => {
            socket.join(conv.conversationId.toString())
          })
        })
        .catch(err => {})
      return user
    })
    .catch(() => null)

  socket.on('I_M_WRITING', data => {
    const { convId } = data
    socket.to(convId).emit('SOME_ONE_IS_WRITING', { user: user.fullName, convId })
  })

  socket.on('USER_SEND_MESSAGE', data => {
    const { convId, text, attachements } = data
    Conversation.findById(convId)
      .then(conv => {
        const message = new Message({
          conversationId: convId,
          sender: user._id,
          text: text,
          attachements: attachements,
        })

        message
          .save()
          .then(mess => io.sockets.to(convId).emit('RECEIVE_MESSAGE', mess))
          .catch(err => socket.emit('USER_SEND_MESSAGE_FAIL', err))
      })
      .catch(err => socket.emit('USER_SEND_MESSAGE_FAIL', err))
  })

  socket.on('I_SAW', async data => {
    const messageId = await Message.find({ conversationId: data.convId })
      .sort({ createdAt: -1 })
      .then(data => data[0].toJSON())
      .then(data => data._id)
      .catch(() => null)
    if (messageId)
      ConversationMember.findOneAndUpdate(
        { conversationId: data.convId, userId: user._id },
        { lastSeen: messageId },
        err => {
          if (err) console.log(err)
        }
      )
    // .then(res => null)
    // .catch(err => )
  })

  socket.on('USER_STATUS_UPDATE', status => {
    const oldStatus = user.status
    user.status = status
    user
      .save()
      .then(() => {
        io.sockets.emit('BROADCAST_MY_STATUS', { user_id: user._id, status })
        socket.emit('USER_STATUS_UPDATED', status)
      })
      .catch(() => {
        io.sockets.emit('BROADCAST_MY_STATUS', { user_id: user._id, status: oldStatus })
        socket.emit('USER_STATUS_UPDATED', oldStatus)
      })
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
  })

  socket.on('disconnect', () => {
    const status = 'D'
    user.status = status
    user.save()
    io.sockets.emit('BROADCAST_MY_STATUS', { user_id: user._id, status })
  })
})

mongoose
  .connect(mongURI, mongoConfig)
  .then(() => console.log('Connection to database done'))
  .catch(err => console.log('Connection to database failed', err))

server.listen(port, () => {
  console.log(`server is running @ http://127.0.0.1:${port}`)
})
