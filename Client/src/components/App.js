import React from "react";
import Header from "./Header";
import Users from "./Users";
import Messages from "./Messages";
import AddUser from "./AddUser";
import AddMessage from "./AddMessage";
import Footer from "./Footer";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="chat-app">
      <Header />
      <div className="chat-container">
        <Users />
        <Messages />
        <AddUser />
        <AddMessage />
      </div>
      <Footer />
    </div>
  );
};

export default App;
