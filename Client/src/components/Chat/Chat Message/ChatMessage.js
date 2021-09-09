import React from "react";

import "./ChatMesasge.css";

function ChatMessage({ message }) {
  const chatBubbles = message.id % 2 === 0 ? "you-message" : "other-message";

  return (
    <div className={`message-row ${chatBubbles}`}>
      <div className="message-content">
        <div className="message-text card-shadow">{message.message}</div>
        <div className="message-time">{message.time}</div>
      </div>
    </div>
  );
}

export default ChatMessage;
