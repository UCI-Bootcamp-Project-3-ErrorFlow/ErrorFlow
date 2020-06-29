const { model, Schema } = require('mongoose');

const Tag = new Schema({
  title: String,
  comment: [{ type: Schema.Types.Array, ref: 'Comment' }],
  author: {
    type: Schema.Types.ObjectId, //we are building relations here with model called 'User'.
    ref: 'User', //will be populated in post routes
  },
});

module.exports = model('Tag', Tag);