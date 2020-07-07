import React from 'react';
import { Card } from 'antd';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Messages.css';
import Message from './Message';

const Messages = ({ messages, name }) => (
 
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Card className="messageCard">
        <Message message={message} name={name} />
        </Card>
      </div>
    ))}
  </ScrollToBottom>
  
);

export default Messages;
