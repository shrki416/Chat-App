import React from "react";
import send from "../assets/send-icon.png";

const AddMessage = () => {
  const handleClick = e => {
    console.log("message sent");
  };

  return (
    <div className="add-message">
      <input placeholder="what's on your mind?" />
      <button onClick={handleClick}>
        <img src={send} />
      </button>
    </div>
  );
};

export default AddMessage;
