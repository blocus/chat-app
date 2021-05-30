const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const mongURI = process.env.MONGO_URI
const mongoConfig = require('./mongo_config.json')
const port = process.env.PORT || 5000
const app = express()
const router = require('./router')
mongoose
  .connect(mongURI, mongoConfig)
  .then(() => console.log('Connection to database done'))
  .catch(err => console.log('Connection to database failed', err))

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`server is running @ http://127.0.0.1:${port}`)
})
