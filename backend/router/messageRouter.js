const express = require('express')
const router = express.Router()
const isAuth = require('../middlewares/auth')
const Message = require('../model/MessageModel')

router.post('/:conversationId', isAuth, (req, res) => {
  console.log(req.body)
  const newmessage = Message({
    conversationId: req.params.conversationId,
    sender: req.user._id,
    message: {
      text: req.body.text,
      attachements: req.body.attachements,
    },
  })

  newmessage
    .save()
    .then(message => res.send(message))
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
})

module.exports = router
