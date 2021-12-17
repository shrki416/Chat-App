import "../styles/Chat.css";

import React from "react";

function ChatList({
  channels,
  setIsChannel,
  setChannel,
  getChatMessages,
  getChannelId,
  setReceiverId,
}) {
  function handleClick(e) {
    const channel = e.target.textContent;
    setIsChannel(true);
    setChannel(channel);
    getChannelId(channel);
    getChatMessages(channel);
    setReceiverId("");
  }

  return (
    <div id="chat-list">
      <h2>Rooms</h2>
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
