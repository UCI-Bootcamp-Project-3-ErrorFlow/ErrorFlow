const { model, Schema } = require('mongoose');

const Comment = new Schema({
  title: String,
  body: String,
  postId:{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  author: {
    type: Schema.Types.ObjectId, //we are building relations here with model called 'User'.
    ref: 'User', //will be populated in post routes
  },
});

module.exports = model('Comment', Comment);