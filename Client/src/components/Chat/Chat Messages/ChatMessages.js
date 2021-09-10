import React from "react";
import ChatMessage from "../Chat Message/ChatMessage";
import ScrollableFeed from "react-scrollable-feed";

import "./ChatMessages.css";

function ChatMessages({ messageList, user }) {
  const messages = messageList.map((message) => (
    <ChatMessage key={message.id} message={message} user={user} />
  ));

  // <div id="chat-message-list">{messages}</div>;

  return (
    <div id="chat-message-list">
      <ScrollableFeed>{messages}</ScrollableFeed>
    </div>
  );
}

export default ChatMessages;
