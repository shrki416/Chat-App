import React from "react";
import send from "../assets/send-icon.png";
import add from "../assets/add-icon.png";
import data from "./data";

const Chat = () => {
  const addMessage = e => {
    console.log("message sent");
  };

  const addUser = e => {
    console.log("user added");
  };

  return (
    <div className="container">
      <div className="user-container">
        <div className="users">
          <h2>Users</h2>
          <p>{data[0].name}</p>
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
          <p>
            {data[0].name}: {data[0].text}
          </p>
          <p>
            {data[1].name}: {data[1].text}
          </p>
          <p>
            {data[2].name}: {data[2].text}
          </p>
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
