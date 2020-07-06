// import React from 'react';
// import './Message.css';
// import ReactEmoji from 'react-emoji';

// const Message = ({ message: { text, user }, name }) => {
//   let isSentByCurrentUser = false;
//   const trimmedName = name.trim().toLowerCase();

//   if (user === trimmedName) {
//     isSentByCurrentUser = true;
//   }

//   return isSentByCurrentUser ? (
//     <div className='messageCotainer'>
//       <p className='sentText'>{trimmedName}</p>
//       <div className='messageBox'>
//         <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
//       </div>
//     </div>
//   ) : (
//     <div className='messageCotainer justriftStart'>
//       <div className='messageBox backgroundLight'>
//         <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
//       </div>
//       <p className='sentText pl-10'>{user}</p>
//     </div>
//   );
// };

// export default Message;
