const { model, Schema } = require('mongoose');

const Comment = new Schema({
  commentBody: String,
  // postId:{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Post'
  // },
  // commentAuthor: String
});

module.exports = model('Comment', Comment);