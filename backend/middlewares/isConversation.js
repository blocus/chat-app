const Conversation = require('../model/conversationModel')
const isConversation = (req, res, next) => {
  // next()
  const { conversationId } = req.params
  Conversation.findById(conversationId)
    .then(conversation => {
      if (conversation) {
        req.conversation = conversation
        next()
      } else return res.status(404).send()
    })
    .catch(() => res.status(500).send())
}
module.exports = isConversation
