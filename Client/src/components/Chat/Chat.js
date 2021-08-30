import React from "react";
import Navbar from "../Navbar/Navbar";

import "./Chat.css";

const Chat = ({ auth }) => {
  return (
    <>
      <Navbar auth={auth} />
    </>
  );
};

export default Chat;
