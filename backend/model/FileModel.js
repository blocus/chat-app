const mongoose = require('mongoose')
const { Schema } = mongoose

const FileSchema = Schema(
  {
    owner: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    color: String,
    icon: String,
    name: String,
    size: Number,
  },
  { timestamps: true }
)

module.exports = mongoose.model('File', FileSchema)
