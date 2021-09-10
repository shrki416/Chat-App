import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { io } from "socket.io-client";
import axios from "axios";

import "./Chat.css";
import ChatForm from "./Chat Form/ChatForm";
import ChatMessages from "./Chat Messages/ChatMessages";

const Chat = ({ auth }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");

  const socket = io();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server", socket.id);
    });

    socket.emit("recieve-message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    getUserProfile();
    getMessages();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      userId: id,
      message: input,
    };

    axios.post("/api/message", data);
    socket.emit("recieve-message", data);
    setInput("");
  }

  async function getUserProfile() {
    try {
      const config = {
        headers: {
          token: localStorage.token,
        },
      };

      await axios.get("/api/user", config).then((res) => setUser(res.data));
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getMessages() {
    try {
      await axios.get("/api/message").then((res) => setMessages(res.data));
    } catch (error) {
      console.error(error.message);
    }
  }

  const { firstname, lastname, id } = user;
  console.table(messages);

  return (
    <>
      <Navbar auth={auth} />

      <div className="chat">
        <div id="chat-container">
          <div id="search-container">
            <input type="text" name="search-message-box" placeholder="Search" />
          </div>
          <div id="conversation-list">
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Jon Snow</div>
              <div className="created-date">Apr 16</div>
              <div className="conversation-message">This is a message</div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Kim O'Neil</div>
              <div className="created-date">2 days ago</div>
              <div className="conversation-message">Very funny</div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">John Anderson</div>
              <div className="created-date">1 week ago</div>
              <div className="conversation-message">
                Yes I love how Python does that
              </div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Ben Smith</div>
              <div className="created-date">2:49 PM</div>
              <div className="conversation-message">
                Yeah Miami Heat are done
              </div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Douglas Johannasen</div>
              <div className="created-date">6:14 PM</div>
              <div className="conversation-message">No it does not</div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Jacob Manly</div>
              <div className="created-date">3 secs ago</div>
              <div className="conversation-message">
                Just be very careful doing that
              </div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Stacey Wilson</div>
              <div className="created-date">30 mins ago</div>
              <div className="conversation-message">
                Awesome!!! Congratulations!!!!
              </div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Stan George</div>
              <div className="created-date">1 week ago</div>
              <div className="conversation-message">Good job</div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Sarah Momes</div>
              <div className="created-date">1 year ago</div>
              <div className="conversation-message">
                Thank you. I appreciate that.
              </div>
            </div>
          </div>
          <div id="new-message-container">
            <AddCircleIcon fontSize="large" id="add-icon" />
          </div>
          <div id="chat-title">
            <span>
              {firstname} {lastname}
            </span>
            <DeleteIcon fontSize="large" id="delete-icon" />
          </div>
          <ChatMessages messageList={messages} user={user} />
          <ChatForm
            handleSubmit={handleSubmit}
            setInput={setInput}
            input={input}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
