const mongoose = require('mongoose')
const { Schema } = mongoose
const conversationMemberModel = require('./conversationMemberModel')
const User = require('./userModel')
const genRandomDate = () => {
  const Y = 2021
  const M = Math.floor(Math.random() * 2) + 2
  const D = Math.floor(Math.random() * 28)
  const h = Math.floor(Math.random() * 24)
  const i = Math.floor(Math.random() * 60)
  return new Date(Y, M, D, h, i)
}
const defaultAvatar = '/assets/images/default_conversation.png'
const conversationSchema = Schema(
  {
    name: { type: String },
    avatar: { type: String, default: defaultAvatar },
    type: { type: String, enum: ['G', 'P'], default: 'P' },
    attachements: [{ type: mongoose.Schema.ObjectId, ref: 'File' }],
  },
  { timestamps: true }
)

conversationSchema.methods.lastMessage = function (myId) {
  return {
    seen: Math.random() < 0.5,
    date: genRandomDate(),
    preview: 'Hello',
  }
}

conversationSchema.methods.relativeMembers = async function (me) {
  let tmp = { name: 'Undefined User', avatar: defaultAvatar, status: undefined }

  if (this.name) return this.name

  const members = await conversationMemberModel
    .find({
      userId: { $ne: me },
      conversationId: this._id,
    })
    .populate('userId')
    .then(data =>
      data.map(item => ({
        status: item.userId.status,
        name: item.userId.fullName,
        avatar: item.userId.avatar,
        id: item.userId._id,
      }))
    )
    .catch(err => null)

  if (members === null) return tmp
  if (members.length !== 0)
    return {
      avatar: this.type === 'P' ? members[0].avatar : this.avatar,
      status: this.type === 'P' ? members[0].status : undefined,
      name: members.map(e => e.name).join(', '),
      members: members.map(e => e.id),
    }
  return { name: me.fullName, avatar: me.avatar, status: me.status, members: [me._id] }
}

conversationSchema.methods.toJSON = async function (me) {
  const lastMessage = await this.lastMessage(me)
  const members = await this.relativeMembers(me)
  return {
    id: this._id,
    type: this.type,
    ...members,
    ...lastMessage,
  }
}

module.exports = mongoose.model('Conversation', conversationSchema)
