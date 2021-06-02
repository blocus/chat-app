const express = require('express')
const router = express.Router()
const isAuth = require('../middlewares/auth')
// const isConversation = require('../middlewares/isConversation')
const File = require('../model/FileModel')
const { types } = require('../consts')

router.post('/upload', isAuth, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({ msg: 'file is not found' })
  }

  const owner = req.user._id
  const myFile = req.files.file
  const name = req.files.file.name
  const size = req.files.file.size
  const mimetype = req.files.file.mimetype

  let ext = req.files.file.name.split('.')
  ext = ext[ext.length - 1]
  const type = types[ext.toLowerCase()] ?? 'oth'
  const path = `${myFile.md5}.${ext}`
  const filePath = `${__dirname}/../uploads/${path}`

  myFile.mv(filePath, function (err) {
    if (err) return res.status(500).send({ msg: 'Error occured' })
    const file = new File({ owner, type, mimetype, name, size, path })
    file
      .save()
      .then(file => res.status(201).send(file))
      .catch(err => res.status(500).send(err))
  })
})

module.exports = router
