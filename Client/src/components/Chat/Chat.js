import React from "react";
import Navbar from "../Navbar/Navbar";

import "./Chat.css";

const Chat = ({ auth }) => {
  return (
    <>
      <Navbar auth={auth} />
      <div className="chat-container">
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3>Room Name:</h3>
            <h2 id="room-name">JavaScript</h2>
            <h3>Users</h3>
            <ul id="users">
              <li>Brad</li>
              <li>John</li>
              <li>Mary</li>
              <li>Paul</li>
              <li>Mike</li>
            </ul>
          </div>
          <div className="chat-message">
            <div className="message">
              <p className="meta">
                Ahmed
                <span>9:12pm</span>
              </p>
              <p className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="message">
              <p className="meta">
                Jon
                <span>9:15pm</span>
              </p>
              <p className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </main>
        <div className="chat-form-container">
          <form className="chat-form">
            <input
              type="text"
              id="text"
              placeholder="Type a message..."
              required
              autoComplete="off"
            />
            <button className="btn">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
