const { model, Schema } = require('mongoose');

const Comment = new Schema({
  commentBody: String,
});

module.exports = model('Comment', Comment);