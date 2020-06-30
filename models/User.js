const { model, Schema } = require('mongoose');

const User = new Schema({
  name: String,
  email: String,
  username: String,
  // 'posts' will be populated in user routes
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

User.plugin(require('passport-local-mongoose'));

module.exports = model('User', User);
