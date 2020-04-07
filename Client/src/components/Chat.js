import React, { useEffect, useState } from "react";
import send from "../assets/send-icon.png";
import add from "../assets/add-icon.png";

const Chat = () => {
  const [messages, setMessages] = useState({});

  const getMessages = async () => {
    try {
      const db_messages = await fetch("/messages");
      const messages = await db_messages.json();
      setMessages(messages);
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const messagesArr = Object.values(messages);

  const displayMessages = messagesArr.map((message) => {
    return (
      <p key={message.id}>
        {message.userid}: {message.text}
      </p>
    );
  });

  const addMessage = (e) => {
    console.log("message sent");
  };

  const addUser = (e) => {
    e.preventDefault();

    console.log("user added");
  };

  return (
    <div className="container">
      <div className="user-container">
        <div className="users">
          <h2>Users</h2>
          <p>Ahmed</p>
        </div>
        <div>
          <button className="add-user" onClick={addUser}>
            <img src={add} /> Add User
          </button>
        </div>
      </div>
      <div className="message-container">
        <div className="messages">
          <h2>Messages</h2>
          {displayMessages}
        </div>
        <div className="add-message">
          <input placeholder="what's on your mind?" />
          <button onClick={addMessage}>
            <img src={send} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
