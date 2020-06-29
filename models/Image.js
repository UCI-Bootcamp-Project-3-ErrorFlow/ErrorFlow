const { model, Schema } = require('mongoose');
//this is order
const Image = new Schema({
  imageName: String,
  imageData: String,
  postId:{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  author: {
    type: Schema.Types.ObjectId, //we are building relations here with model called 'User'.
    ref: 'User', //will be populated in post routes
  },
});

module.exports = model('Image', Image);