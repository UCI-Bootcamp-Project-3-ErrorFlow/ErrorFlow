const router = require('express').Router();
const { Post, User } = require('../models');
const passport = require('passport');

const auth = passport.authenticate('jwt', { session: false });
const AUTHOR_FIELDS = 'name username';
const OWNER_FIELDS = ['title', 'body', 'isSolved'];
const PUBLIC_FIELDS = ['likeValue', 'isLiked'];

const pick = (obj, keys) =>
  keys.reduce((out, k) => (k in obj ? { ...out, [k]: obj[k] } : out), {});

const fail = (res) => (err) => {
  console.error(err);
  res.sendStatus(500);
};

router.get('/posts', (req, res) => {
  Post.find()
    .populate('author', AUTHOR_FIELDS)
    .then((posts) => res.json(posts))
    .catch(fail(res));
});

router.post('/myposts', auth, async (req, res) => {
  try {
    const post = await Post.create({
      ...pick(req.body, [...OWNER_FIELDS, ...PUBLIC_FIELDS]),
      author: req.user._id,
    });
    await User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } });
    res.json({
      ...post.toObject(),
      author: { _id: req.user._id, name: req.user.name, username: req.user.username },
    });
  } catch (err) {
    fail(res)(err);
  }
});

router.put('/myposts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.sendStatus(404);
    const isOwner = String(post.author) === String(req.user._id);
    // Any signed-in user may like a post; only the author may edit it.
    const allowed = isOwner ? [...OWNER_FIELDS, ...PUBLIC_FIELDS] : PUBLIC_FIELDS;
    await Post.updateOne({ _id: post._id }, { $set: pick(req.body, allowed) });
    res.sendStatus(200);
  } catch (err) {
    fail(res)(err);
  }
});

router.delete('/myposts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!post) return res.sendStatus(404);
    await User.updateOne({ _id: req.user._id }, { $pull: { posts: post._id } });
    res.sendStatus(200);
  } catch (err) {
    fail(res)(err);
  }
});

module.exports = router;
