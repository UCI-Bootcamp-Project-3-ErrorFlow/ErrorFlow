import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import ioClient from 'socket.io-client';

import OnlineContainer from '../OnlineContainer';
import Messages from '../Messages';
import InfoBar from '../InfoBar';
import MessengerInput from '../MessengerInput';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const ENDPOINT = io.connect({path:'CAH/socket.io'})
  const ENDPOINT ='http://localhost:3001';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    console.log(name, room);
    socket = ioClient(ENDPOINT);
    console.log(socket)
console.log(room, name)
    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(message)

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='outerContainer'>
      <div className='container chatBox'>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <MessengerInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <OnlineContainer users={users} />
    </div>
  );
};

export default Chat;
