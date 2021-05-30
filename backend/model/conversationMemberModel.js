const mongoose = require('mongoose')
const { Schema } = mongoose

const conversationMemberSchema = Schema(
  {
    conversationId: { type: mongoose.Schema.ObjectId, required: true, ref: 'Conversation' },
    userId: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    pseudo: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('ConversationMember', conversationMemberSchema)
