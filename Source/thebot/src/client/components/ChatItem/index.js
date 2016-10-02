import React from 'react';

const ChatItem = (props) => {
  return (
    <div className="message">
      <strong>{props.message.from}: </strong>
      <span>{props.message.text}</span>
    </div>
  );
};

export default ChatItem;
