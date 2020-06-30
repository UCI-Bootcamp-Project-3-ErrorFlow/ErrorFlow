const router = require('express').Router();
const { Post, User } = require('../models');
//after locking with authen
const passport = require('passport');

//you need to have to have web-token when you want to see their posts.
//in the postman, go to header and put authorization as key and jsoned web-token in the value.
router.get('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.find()
    .populate('author')
    // .populate('image')
    .populate('tag')
    .populate('comment')
    .populate('likes')
    .then((posts) => res.json(posts))
    .catch((err) => console.error(err));
});

router.post('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.body,
    tag: req.body.tag,
    isSolved: req.body.isSolved,
    likeValue: req.body.likeValue,
    isLiked: false,
    commentBody: req.body.commentBody,
    commentAuthor: req.body.commentAuthor,
    // image: req.body.image,
    comment: req.body.comment,
    author: req.user._id,
  })
    .then((post) => {
      User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
        .then(() =>
          res.json({
            title: post.title,
            body: post.body,
            isSolved: post.isSolved,
            //added by A and L for liked routes
            isLiked: post.liked,
            // image: post.image,
            tag: post.tag,
            comment: post.comment,
            author: req.user,
          })
        )
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

module.exports = router;
