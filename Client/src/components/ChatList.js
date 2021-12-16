import "../styles/Chat.css";

import React from "react";

function ChatList({
  channels,
  setIsChannel,
  setChannel,
  getChatMessages,
  getChannelId,
}) {
  function handleClick(e) {
    const channel = e.target.textContent;
    setIsChannel(true);
    setChannel(channel);
    getChatMessages(channel);
    getChannelId(channel);
  }

  return (
    <div id="chat-list">
      <h2>Channels</h2>
      {channels.map((channel, index) => {
        return (
          <div
            className="conversation"
            key={`${index}_${channel}`}
            onClick={handleClick}
          >
            <h3>{channel}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;
