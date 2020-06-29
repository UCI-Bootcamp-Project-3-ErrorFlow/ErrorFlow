const { model, Schema } = require('mongoose');

const Like = new Schema({
  likeValue: Number,
  isLiked: Boolean,
  postId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ]
});

module.exports = model('Like', Like);
