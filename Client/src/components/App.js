import React from "react";
import Header from "./Header";
import Users from "./Users";
import AddUser from "./AddUser";
import Messages from "./Messages";
import AddMessage from "./AddMessage";
import Footer from "./Footer";

import "../App.css";

const App = () => {
  return (
    <div className="chat-app">
      <Header />
      <div className="container">
        <div className="user-container">
          <Users />
          <AddUser />
        </div>
        <div className="message-container">
          <Messages />
          <AddMessage />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
