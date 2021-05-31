const express = require('express')
const router = express.Router()
const ConversationMember = require('../model/conversationMemberModel.js')
const Conversation = require('../model/conversationModel.js')
const isAuth = require('../middlewares/auth')
const otherUser = require('../middlewares/otherUser')

router.get('/', isAuth, async (req, res) => {
  const myId = req.user._id

  let myConversations = await ConversationMember.find({ userId: myId })
  myConversations = myConversations
    .map(async conv => {
      return Conversation.findById(conv.conversationId)
        .then(con => {
          if (con) return con.toJSON(req.user)
          else return undefined
        })
        .catch(() => undefined)
    })
    .filter(conv => conv !== undefined)

  const conversationList = await (
    await Promise.all(myConversations)
  ).filter(item => item !== undefined)
  res.send(conversationList)
})

router.post('/:otherUserId', isAuth, otherUser, async (req, res) => {
  const conversation = new Conversation({})

  const userId = req.user._id.toString()
  const otherId = req.otherUser._id.toString()
  conversation
    .save()
    .then(conversation => {
      const me = ConversationMember({ conversationId: conversation._id, userId })
      me.save()
        .then(() => {
          if (userId !== otherId) {
            const other = ConversationMember({ conversationId: conversation._id, userId: otherId })
            other
              .save()
              .then(() => res.status(201).send(conversation.toJSON()))
              .catch(err => res.status(500).send())
          }
        })
        .catch(err => res.status(500).send())
    })
    .catch(err => res.status(500).send())
})

module.exports = router
