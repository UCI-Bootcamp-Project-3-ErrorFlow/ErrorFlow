const router = require('express').Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const isString = (v) => typeof v === 'string' && v.length > 0;

router.post('/users/register', (req, res) => {
  const { name, email, username, password } = req.body;
  if (![name, email, username, password].every(isString)) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }
  User.register(new User({ name, email, username }), password, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: 'Could not register user' });
    }
    res.sendStatus(200);
  });
});

router.post('/users/login', (req, res) => {
  const { username, password } = req.body;
  if (!isString(username) || !isString(password)) return res.json(null);
  User.authenticate()(username, password, (err, user) => {
    if (err) console.error(err);
    res.json(
      user
        ? jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '7d' })
        : null
    );
  });
});

router.get('/users/posts', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { _id, name, username, posts } = req.user;
  res.json({ _id, name, username, posts });
});

router.get('/users/authorize', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
