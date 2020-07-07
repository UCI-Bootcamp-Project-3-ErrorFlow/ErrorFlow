require('dotenv').config();
const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');
const { User } = require('./models');
const passport = require('passport');
const { Strategy } = require('passport-local');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const { join } = require('path');

app.use(cors());
app.use(express.static(join(__dirname, 'client', 'build')));
app.use('/uploads', express.static('uploads'));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./routes'));
console.log('before io.on');

io.on('connection', (socket) => {
  console.log('we have a new connection! ', socket.id);
  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room);
    const { error, user } = addUser({
      id: socket.id,
      name,
      room,
    });
    //error=username is already registered
    console.log(user, error);
    if (error) return callback(error);

    // event generatd by admin to user
    socket.emit('message', {
      user: 'admin',
      text: `Hello ${user.name}, welcome to ${user.room}`,
    });

    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has joined!`,
    });
    // socket.join(user, room);

    socket.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    //after emit has been executed(passing data) from Chat.js, this callback is going to return whatever in the callback to the Chat.js
    //callback();

    //event generated by user to everyone
    socket.on('sendMessage', (message, callback) => {
      console.log(socket.id);
      const user = getUser(socket.id);
      console.log('user:', user);
      io.to(user.room).emit('message', {
        user: user.name,
        text: message,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
      callback();
    });
    // On when disconnect
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit('message', {
          user: 'admin',
          text: `${user.name} has left the room.`,
        });
      }
    });
  });
});
console.log('after io.on');
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
  .then(() => server.listen(process.env.PORT || 3001))
  .catch((err) => console.error(err));
