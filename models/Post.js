const { model, Schema } = require('mongoose');

const Post = new Schema({
  title: String,
  body: String,
  isSolved: { type: Boolean, default: false },
  likeValue: { type: Number, default: 0, ref: 'Like' },
  isLiked: { type: Boolean, default: false, ref: 'Like' },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    },
  ],
  author: {
    type: Schema.Types.ObjectId, //we are building relations here with model called 'User'.
    ref: 'User', //will be populated in post routes
  },
  // commentBody: [{ type: String, ref: 'Comment' }],
  // commentAuthor: [{ type: String, ref: 'Comment' }],
  // postId: String,
  //users who have posts, lets call them author,
});

module.exports = model('Post', Post);
