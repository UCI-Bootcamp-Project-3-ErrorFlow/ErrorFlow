const router = require('express').Router();
const { Post, User } = require('../models');
//after locking with authen
const passport = require('passport');

//you need to have to have web-token when you want to see their posts.
//in the postman, go to header and put authorization as key and jsoned web-token in the value.
router.get('/posts', (req, res) => {
  Post.find()
    .populate('author')
    .populate('comment')
    .populate('likes')
    .then((posts) => res.json(posts))
    // .then(({ data }) => {
    //   Post.find().then((posts) => {
    //     const postsFiltered = data.data.filter((post) => {
    //       let keep = true;
    //       posts.forEach((liked) => {
    //         if (liked.postId === post._id) {
    //           keep = false;
    //         }
    //       });
    //       return keep;
    //     });
    //     res.json(postsFiltered);
    //   });
    // })

    .catch((err) => console.error(err));
});

// router.post('/posts', (req, res) => {
//   Post.create(req.body)
//     .then((posts) => res.json(posts))
//     .catch((err) => console.error(err));
// });

router.get('/myposts', passport.authenticate('jwt'), (req, res) => {
  Post.find()
    .populate('author')
    .populate('comment')
    .populate('likes')
    .then((posts) => res.json(posts))
    .catch((err) => console.error(err));
});

router.post('/myposts', passport.authenticate('jwt'), (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.body,
    isSolved: req.body.isSolved,
    likeValue: req.body.likeValue,
    isLiked: false,
    commentBody: req.body.commentBody,
    commentAuthor: req.body.commentAuthor,
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
            comment: post.comment,
            author: req.user,
          })
        )
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

router.delete('/myposts/:id', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => console.error(err));
});

router.put('/myposts/:id',  passport.authenticate('jwt'), (req, res) => { 
  Post.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err))
})

module.exports = router;
