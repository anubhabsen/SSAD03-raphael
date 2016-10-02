import React from 'react';
import ChatItem from '../ChatItem';

const MainSection = (props) => {
  return (
    <ul className="messages">
      {
        props.messages.map(function(message, i) {
          return (
            <li className="clearfix" key={i}>
              <ChatItem message={message} />
            </li>
          );
        })
      }
    </ul>
  );
};

export default MainSection;
