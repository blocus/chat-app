const mongoose = require('mongoose')
const { Schema } = mongoose
const Message = require('./MessageModel')
const conversationMemberModel = require('./conversationMemberModel')

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

conversationSchema.methods.lastMessage = async function (myId) {
  const lastSeen = await conversationMemberModel
    .findOne({
      conversationId: this._id,
      userId: myId,
    })
    .then(last => last.lastSeen)
    .catch(err => null)

  console.log(lastSeen)

  return Message.find({ conversationId: this._id })
    .populate('sender')
    .populate('message.attachements')
    .sort({ createdAt: -1 })
    .then(data => data[0].toJSON())
    .then(data => ({
      seen: data._id?.toString() === lastSeen?.toString(),
      date: data.createdAt ?? this.createdAt,
      preview: data.text,
    }))
    .catch(err => {
      console.log(err)
      return {
        date: this.createdAt,
      }
    })
}

conversationSchema.methods.getMessages = function (myId) {
  return Message.find({ conversationId: this._id })
    .sort({ createdAt: -1 })
    .then(data => data.map(e => e.toJSON()))
    .catch(() => [])
}

conversationSchema.methods.relativeMembers = async function (me) {
  let tmp = { name: 'Undefined User', avatar: defaultAvatar, status: undefined }

  if (this.name) tmp.name = this.name

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
      name: this.name ?? members.map(e => e.name).join(', '),
      members: members.map(e => e.id),
    }
  return { name: me.fullName, avatar: me.avatar, status: me.status, members: [me._id] }
}

conversationSchema.methods.fullMembers = function () {
  return conversationMemberModel
    .find({
      conversationId: this._id,
    })
    .populate('userId')
    .then(data => data.map(e => e.userId))
    .catch(() => [])
}

conversationSchema.methods.toJSON = async function (me) {
  const lastMessage = (await this.lastMessage(me)) ?? {}

  const members = await this.relativeMembers(me)
  return {
    id: this._id,
    type: this.type,
    ...members,
    ...lastMessage,
  }
}

conversationSchema.methods.getFullData = async function (me) {
  const members = await this.relativeMembers(me)
  const membersData = await this.fullMembers()
  const messages = await this.getMessages()
  return {
    conversation: {
      id: this._id,
      name: this.name,
      avatar: this.avatar,
      type: this.type,
      attachements: this.attachements,
      createdAt: this.createdAt,
      ...members,
      members: membersData,
    },
    messages,
  }
}

module.exports = mongoose.model('Conversation', conversationSchema)
