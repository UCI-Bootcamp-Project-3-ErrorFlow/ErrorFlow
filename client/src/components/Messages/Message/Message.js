import React from 'react';
import { Card } from 'antd';
import './Message.css';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className='messageCotainer'>
      <p className='sentText'>{trimmedName}</p>
      <Card>
      <div className='messageBin'>
        <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
      </div>
      </Card>
    </div>
  ) : (
    <div className='messageCotainer justriftStart'>
      <Card>
      <div className='messageBin backgroundLight'>
        <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
      </div>
      </Card>
      <p className='sentText pl-10'>{user}</p>
    </div>
  );
};

export default Message;
