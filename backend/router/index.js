const express = require('express')
const router = express.Router()

const authRouter = require('./authRouter')
const conversationRouter = require('./conversationRouter')

router.use('/auth', authRouter)
router.use('/conversation', conversationRouter)

router.get('/', (_, res) => {
  res.send('Hello')
})

module.exports = router
