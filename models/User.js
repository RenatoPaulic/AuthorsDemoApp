const mongoose = require('mongoose')
const Books = require('./Book')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  surname: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String,  required: true },
  role: { type: String, enum: ['Admin', 'Author'], default: 'Author', required: true},
  avatar: { type: String },
  createdDate: { type: Date, default: Date.now }
})

UserSchema.pre('findOneAndDelete', async function(next) {
  await Books.deleteMany({author: this._conditions._id})
  next()
})

module.exports = mongoose.model('user', UserSchema)