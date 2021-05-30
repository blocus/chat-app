const express = require('express')
const router = express.Router()

const authRouter = require('./authRouter')

router.use('/auth', authRouter)

router.get('/', (_, res) => {
  res.send('Hello')
})

module.exports = router
