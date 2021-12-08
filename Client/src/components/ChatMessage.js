import "../styles/ChatMesasge.css";

import React, { useCallback } from "react";

function ChatMessage({ message, user }) {
  const id = message.user_id;
  const LOGGED_IN_USER = user.id === id;
  const { firstname, lastname } = user;

  const chatBubbles = LOGGED_IN_USER ? "you-message" : "other-message";
  const userBubble = LOGGED_IN_USER ? `${firstname} ${lastname}` : message.from;

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
    <>
      <div className={`message-row ${chatBubbles}`} ref={setRef}>
        <div className="message-content">
          {LOGGED_IN_USER && <div className="delete-button">x</div>}
          <div className="message-text card-shadow">{message.message}</div>
          <div className="message-date">
            {userBubble} - {formatDate(message.created_at)}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatMessage;
