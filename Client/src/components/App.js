import React from "react";
import Header from "./Header";
import Users from "./Users";
import AddUser from "./AddUser";
import Messages from "./Messages";
import AddMessage from "./AddMessage";
import Footer from "./Footer";
import data from "../components/data";
import "../App.css";

const App = () => {
  const messages = data.map(message => {
    <Messages message={message} key={message.id}/>;
  });

  return (
    <div className='chat-app'>
      <Header />
      <div className='container'>
        <div className='user-container'>
          <Users />
          <AddUser />
        </div>
        <div className='message-container'>
          {messages}
          <AddMessage />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
