import "../styles/Chat.css";

import React from "react";

function ChatList({
  channels,
  setChannel,
  getChatMessages,
  setReceiverId,
}) {
  function handleClick(channel) {
    setChannel(channel);
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
            key={`${index}_${channel.id}`}
            onClick={() => handleClick(channel)}
          >
            <h3>{channel.room_name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;
