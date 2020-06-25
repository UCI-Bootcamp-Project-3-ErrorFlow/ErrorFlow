const router = require('express').Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Register Route -quinton 6/15 lecture
router.post('/users/register', (req, res) => {
  const { name, email, username } = req.body;
  User.register(
    new User({ name, email, username }),
    req.body.password,
    (err) => {
      if (err) {
        console.error(err);
      }
      res.sendStatus(200);
    }
  );
});

// Login Route
//login routes and create token as they do
// if password and username are correct, returning user with matching hash salt, if either of them is not correct, will return false jsoned webtoken is able to see in the postman Header as you post with correct username and id
router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) {
      console.error(err);
    }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null);
  });
});

router.get('/users/posts', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user);
});

router.get('/users/authorize', passport.authenticate('jwt'), (req, res) => {
  res.sendStatus(200);
});

module.exports = router;