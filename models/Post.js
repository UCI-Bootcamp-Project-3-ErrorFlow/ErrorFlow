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

  tag: [{ type: Schema.Types.Array, ref: 'Tag' }],
  comment: [{ type: Schema.Types.Array, ref: 'Comment' }],
  like: 
       [{ type: Number},
        { type: Boolean}],
  //users who have posts, lets call them author,
  author: {
    type: Schema.Types.ObjectId, //we are building relations here with model called 'User'.
    ref: 'User', //will be populated in post routes
  },
});

module.exports = model('Post', Post);
