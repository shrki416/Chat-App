import React from "react";
import send from "../assets/send-icon.png";

const AddMessage = () => {
  return (
    <div className="chat-container-add-message">
      <div className="add-message-container">
        <input type="text" placeholder="what's on your mind?" />
        <img src={send} />
      </div>
    </div>
  );
};

export default AddMessage;
