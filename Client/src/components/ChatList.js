import "../styles/Chat.css";

import React from "react";

function ChatList({ channels, setIsChannel, setChannel }) {
  function handleClick(e) {
    const channel = e.target.textContent;
    setIsChannel(true);
    setChannel(channel);
  }

  return (
    <div id="chat-list">
      <h2>Channels</h2>
      {channels.map((channel, index) => {
        return (
          <div className="conversation" key={index} onClick={handleClick}>
            {channel}
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;
