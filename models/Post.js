const { model, Schema } = require('mongoose');

const Post = new Schema({
  title: String,
  body: String,
  //users who have posts, lets call them author,
  author: {
    type: Schema.Types.ObjectId, //we are building relations here with model called 'User'.
    ref: 'User', //will be populated in post routes
  },
});

module.exports = model('Post', Post);
