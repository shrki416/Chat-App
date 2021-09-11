import React, { useCallback } from "react";

import "./ChatMesasge.css";

function ChatMessage({ message, user }) {
  const id = message.user_id;
  const chatBubbles = user.id === id ? "you-message" : "other-message";

  const { firstname, lastname } = user;
  const userBubble = user.id === id && `${firstname} ${lastname}`;

  const formatDate = (date) => {
    const messageDate = new Date(date);
    const options = {
      month: "short",
      day: "numeric",
    };

    return messageDate.toLocaleDateString("en-US", options);
  };

  const setRef = useCallback((node) => {
    if (node) node.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className={`message-row ${chatBubbles}`} ref={setRef}>
      <div className="message-content">
        <div className="message-text card-shadow">{message.message}</div>
        <div className="message-date">
          {userBubble} {formatDate(message.created_at)}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
