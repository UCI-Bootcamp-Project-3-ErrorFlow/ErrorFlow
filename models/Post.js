const { model, Schema } = require('mongoose');

const Post = new Schema({
  title: String,
  body: String,
  isSolved: Boolean,
  // image: [
  //   { type: Schema.Types.Array, ref: 'Image' },
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Image',
  //   },
  // ],
  // user: {
  //   type: Schema.Types.String,
  //   ref: 'User'
  // },
  tag: [{ type: String, ref: 'Tag' }],
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
