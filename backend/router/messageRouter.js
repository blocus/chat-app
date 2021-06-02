const express = require('express')
const router = express.Router()
const isAuth = require('../middlewares/auth')
const isConversation = require('../middlewares/isConversation')
const Message = require('../model/MessageModel')

router.post('/:conversationId', isAuth, isConversation, (req, res) => {
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

router.get('/:conversationId', isAuth, isConversation, async (req, res) => {
  res.send(await req.conversation.getFullData(req.user))
})

module.exports = router
