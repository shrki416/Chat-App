import "./ChatMessages.css";

import ChatMessage from "../Chat Message/ChatMessage";
import React from "react";

function ChatMessages({ messageList, user, userLeave }) {
  const messages = messageList.map((message) => (
    <ChatMessage key={message.id} message={message} user={user} userLeave={userLeave}/>
  ));

  return <div id="chat-message-list">{messages}</div>;
}

export default ChatMessages;
