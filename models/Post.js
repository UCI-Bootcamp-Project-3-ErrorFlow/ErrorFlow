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
      ref: 'Comment',
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('Post', Post);
