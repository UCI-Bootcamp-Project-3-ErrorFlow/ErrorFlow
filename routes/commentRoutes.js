const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const passport = require('passport');

//get call comments and populate on post
router.get('/comments', (req, res) => {
    Comment.findById(req.params.id)
        .populate('postId')
        .populate('commentAuthor')
      .then((comments) => res.json(comments))
      .catch((err) => console.error(err));
  });

  router.post('/comments', passport.authenticate('jwt'), (req, res) => {
    Comment.create({
      commentBody: req.body.commentBody,
      commentAuthor: req.body.commentAuthor,
      postId: req.body.postId
    })
      .then((post) => {
        Post.findByIdAndUpdate(post.postId, { $push: { comments: comment._id } })
          .then(() =>
            res.json({
              title: post.title,
              body: post.body,
              isSolved: post.isSolved,
              //added by A and L for liked routes
              isLiked: post.liked,
              comments: post.comments,
              author: req.user,
            })
          )
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  });


  module.exports = router;
