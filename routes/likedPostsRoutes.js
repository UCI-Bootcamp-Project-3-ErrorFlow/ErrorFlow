const router = require('express').Router();
const { Post } = require('../models')

router.get('/posts/:like', (req, res) => {
    Post.findById(req.params.like._id)
    .then(({ data }) => {
      Post.find()
        .then(posts => {
          const postsFiltered = data.data.filter(post => {
            let keep = true
            posts.forEach(liked => {
              if (liked.gifId === gif.id) {
                keep = false
              }
            })
            return keep
          })
          res.json(postsFiltered)
        })
    })
    .catch(err => console.error(err))
})



// router.get('/posts/:likedId')
// User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
// .then(() =>
//   res.json({
//     title: post.title,
//     body: post.body,
//     isSolved: post.isSolved,
//     image: post.image,
//     tag: post.tag,
//     comment: post.comment,
//     author: req.user,
//   })
// )
// .catch((err) => console.error(err));

module.exports = router;