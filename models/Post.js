const { model, Schema } = require('mongoose');

const Post = new Schema({
  title: String,
  body: String,
  isSolved: Boolean,
  commentBody: [{ type: String, ref: 'Comment' }],
  commentAuthor: [{ type: String, ref: 'Comment'}],
  likeValue: { type: Number, ref: 'Like' },
  isLiked: { type: Boolean, ref: 'Like'},
  //users who have posts, lets call them author,
  author: {
    type: Schema.Types.ObjectId, //we are building relations here with model called 'User'.
    ref: 'User', //will be populated in post routes
  },
});

module.exports = model('Post', Post);
