const express = require('express')
const router = express.Router()

const authRouter = require('./authRouter')
const conversationRouter = require('./conversationRouter')
const userRouter = require('./userRouter')
const messageRouter = require('./messageRouter')
const fileRouter = require('./fileRouter')

router.use('/auth', authRouter)
router.use('/conversation', conversationRouter)
router.use('/members', userRouter)
router.use('/message', messageRouter)
router.use('/file', fileRouter)

router.get('/', (_, res) => {
  res.send('Hello')
})

module.exports = router
