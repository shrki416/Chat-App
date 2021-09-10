import React from "react";
import ChatMessage from "../Chat Message/ChatMessage";

import "./ChatMessages.css";

function ChatMessages({ messageList, user }) {
  const messages = messageList.map((message) => (
    <ChatMessage key={message.id} message={message} user={user} />
  ));

  return <div id="chat-message-list">{messages}</div>;
}

export default ChatMessages;
