import React from "react";
import chat from "../assets/chat_icon.png";

const Header = () => {
  return (
    <>
      <div className="header">
        <img src={chat} />
        <h1>Chat App</h1>
      </div>
    </>
  );
};

export default Header;
