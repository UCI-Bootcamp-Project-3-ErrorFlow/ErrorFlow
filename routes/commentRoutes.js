const router = require('express').Router();
const { Comment } = require('../models');
const passport = require('passport');

//get call comments and populate on post
router.get('/comments', (req, res) => {
  Comment.find()
    .then((comments) => res.json(comments))
    .catch((err) => console.error(err));
});

router.post('/mycomments', passport.authenticate('jwt'), (req, res) => {
  Comment.create({
    commentBody: req.body.commentBody,
  })
    .then(comments => res.json(comments))
    .catch((err) => console.error(err))
});

router.delete('/mycomments/:id', passport.authenticate('jwt'), (req, res) => {
  Comment.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => console.error(err));
});

module.exports = router;
