require('dotenv').config();
const express = require('express');
const http = require("http");
const socketio = require("socket.io");
const { User } = require('./models');
const passport = require('passport');
const { Strategy } = require('passport-local');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { join } = require('path');

app.use(express.static(join(__dirname, 'client', 'build')));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//must come before app.get
app.use(require('./routes'));

io.on("connection", (socket) => {
// On new user, broardcast to everyone that is online
socket.on("newUserSignUp", (message) => {
//Broadcast when a new user signup
socket.broadcast.emit("newUserSignUp", message);
});
// On new update, letting all the users that are friends know so we can re-render their list items
socket.on("Update", (message) => {
  io.emit("Update", message);
  });
// Sending message back and forth using user id
socket.on("message", ({ userId, message }) => {
  socket.emit(userId, message);
  });
  // On when disconnect
socket.on("disconnect", () => {
  io.emit("userleft", "User has left!");
  });
});
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
