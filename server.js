require('dotenv').config();
const express = require('express');
const { User } = require('./models');
const passport = require('passport');
const { Strategy } = require('passport-local');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const app = express();
const { join } = require('path');

app.use(express.static(join(__dirname, 'client', 'build')));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//must come before app.get
app.use(require('./routes'));
//don't move me
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'client', 'build', 'index.html'));
});

// authentication
passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    },
    ({ id }, cb) =>
      User.findById(id)
        .populate('posts')
        .then((user) => cb(null, user))
        .catch((err) => cb(err))
  )
);

require('mongoose')
  .connect(process.env.MONGODB_URI || process.env.LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(process.env.PORT || 3001))
  .catch((err) => console.error(err));
