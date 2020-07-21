const { model, Schema } = require('mongoose');

const User = new Schema({
  name: String,
  email: String,
  username: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

User.plugin(require('passport-local-mongoose'));

module.exports = model('User', User);
