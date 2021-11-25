const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  title:  { type: mongoose.Schema.Types.String, required: true },
  createdDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('book', BookSchema);