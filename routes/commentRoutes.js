const router = require('express').Router();
const { Comment } = require('../models');
const passport = require('passport');

const auth = passport.authenticate('jwt', { session: false });

router.get('/comments', (req, res) => {
  Comment.find()
    .then((comments) => res.json(comments))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.post('/mycomments', auth, (req, res) => {
  const { commentBody } = req.body;
  if (typeof commentBody !== 'string' || !commentBody.trim()) {
    return res.status(400).json({ error: 'commentBody is required' });
  }
  Comment.create({ commentBody })
    .then((comment) => res.json(comment))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Comments carry no author, so ownership can't be verified yet; see review notes.
router.delete('/mycomments/:id', auth, (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
