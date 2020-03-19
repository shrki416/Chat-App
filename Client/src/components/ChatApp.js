import React from "react";

const ChatApp = () => {
  return (
    <div Name="chat">
      <div className="chat-left-sidebar">
        <div className="chat-app-user-list"></div>
      </div>
      <div className="chat-right-sidebar">
        <div className="chat-app-header"></div>
        <div className="chat-app-message-list"></div>
        <div className="chat-message-composer"></div>
      </div>
    </div>
  );
};

export default ChatApp;
