const mongoose = require('mongoose')
const { Schema } = mongoose
const { fileColors } = require('../consts')
const FileSchema = Schema(
  {
    owner: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    type: { type: String, enum: Object.keys(fileColors), required: true },
    mimetype: { type: String, required: true },
    name: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true }
)

FileSchema.methods.toJSON = function () {
  return {
    id: this._id,
    ...fileColors[this.type],
    name: this.name,
    mimetype: this.mimetype,
    size: this.size,
  }
}

module.exports = mongoose.model('File', FileSchema)
