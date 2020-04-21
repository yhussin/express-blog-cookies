const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  articles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }],
}, {timestamps: true});

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
