const { model, Schema } = require('mongoose');

const Like = new Schema({
  likeValue: Number,
  isLiked: Boolean,
  post: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ]
});

module.exports = model('Like', Like);