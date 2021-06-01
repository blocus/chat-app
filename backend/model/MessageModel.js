const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = Schema(
  {
    conversationId: { type: mongoose.Schema.ObjectId, required: true, ref: 'Conversation' },
    sender: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    message: {
      text: { type: String },
      attachements: [{ type: mongoose.Schema.ObjectId, ref: 'File' }],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Message', messageSchema)
