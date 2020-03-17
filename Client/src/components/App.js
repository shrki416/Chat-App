import React from "react";
import Header from "./Header";
import Users from "./Users";
import Messages from "./Messages";
import AddUser from "./AddUser";
import AddMessage from "./AddMessage";
import Footer from "./Footer";
import "../App.css";

const App = () => {
  return (
    <div className="chat-app">
      <Header />
      <Users />
      <Messages />
      <AddUser />
      <AddMessage />
      <Footer />
    </div>
  );
};

export default App;
