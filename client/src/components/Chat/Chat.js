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
  const ENDPOINT = 'https://guarded-harbor-13074.herokuapp.com';
  //or 'localhost:3001'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = ioClient(ENDPOINT);
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

    socket.on('roomData', (users) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

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
