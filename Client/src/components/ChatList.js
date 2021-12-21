import "../styles/Chat.css";

import React from "react";

function ChatList({ channels, setChannel, getChatMessages, setReceiverId }) {
  function handleClick(channel) {
    setChannel(channel);
    getChatMessages(channel);
    setReceiverId("");
  }

  return (
    <div id="chat-list">
      <h2>Rooms</h2>
      {channels.map((channel) => {
        return (
          <div
            className="conversation"
            key={channel.id}
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
