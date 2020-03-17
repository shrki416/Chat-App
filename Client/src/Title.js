import React from "react";
import chat from "./assets/chat_icon.png";

const Title = () => {
  return (
    <>
      <div className="title">
        <img src={chat} />
        <h1>Chat App</h1>
      </div>
    </>
  );
};

export default Title;
