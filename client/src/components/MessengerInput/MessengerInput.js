import React from 'react';
import { Input, Button } from 'antd';

import './MessengerInput.css';

const MessengerInput = ({ message, setMessage, sendMessage }) => (
  <>
    <Input
      className='input'
      type='text'
      placeholder='Type a message...'
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) =>
        event.key === 'Enter' ? sendMessage(event) : null
      }
    />
    <Button className='sendButton' onClick={(event)=>sendMessage(event)}>Send</Button>
  </>
);

export default MessengerInput;
