import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";

import { io } from "socket.io-client";
import axios from "axios";

import "./Chat.css";
import ChatForm from "./Chat Form/ChatForm";
import ChatMessages from "./Chat Messages/ChatMessages";
import ConversationList from "./ConversationList";

const Chat = ({ auth }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");
  const [conversations, setConversations] = useState("");

  const socket = io();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server", socket.id);
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    getUserProfile();
    getMessages();
  }, []);

  function handleClick(e) {
    setConversations(e.target.textContent);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { id } = user;

    const data = {
      userId: id,
      message: input,
    };

    const privateMessage = socket.id;
    console.log(privateMessage);

    axios.post("/api/message", data);
    socket.emit("message", data);
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

  return (
    <>
      <Navbar auth={auth} user={user} />

      <div className="chat">
        <div id="chat-container">
          <div id="search-container">
            <input type="text" name="search-message-box" placeholder="Search" />
          </div>
          <ConversationList handleClick={handleClick} />
          <div id="new-message-container">
            <AddCircleIcon fontSize="large" id="add-icon" />
          </div>
          <div id="chat-title">
            <span>To: {conversations}</span>
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
