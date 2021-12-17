import "../styles/ChatMessages.css";

import ChatMessage from "./ChatMessage";
import React from "react";

function ChatMessages({ messageList, user }) {
  const messages = messageList.map((message, index) => (
    <ChatMessage key={`${message.id}_${index}`} message={message} user={user} />
  ));

  return <div id="chat-message-list">{messages}</div>;
}

export default ChatMessages;
