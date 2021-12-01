import "../styles/Chat.css";

import React, { useEffect, useState } from "react";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import ChatForm from "./ChatForm";
import ChatMessages from "./ChatMessages";
import ConversationList from "./ConversationList";
import DeleteIcon from "@material-ui/icons/Delete";
import Navbar from "./Navbar";
import axios from "axios";
import { io } from "socket.io-client";

const Chat = ({ auth }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [receiverName, setReceiverName] = useState("");

  const socket = io();

  socket.on("message", (message) => {
    if (
      (message.receiver_id === localStorage.getItem("mate") &&
        message.user_id === localStorage.getItem("me")) ||
      (message.receiver_id === localStorage.getItem("me") &&
        message.user_id === localStorage.getItem("mate"))
    ) {
      setMessages((messages) => [...messages, message]);
    }
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server", socket.id);
      getUserProfile();
    });

    socket.on("login", ({ activeUsers }) => {
      console.log("🍏", activeUsers);
    });

    socket.on("logout", ({ name }) => {
      console.log(`🍌`, name);
    });

    return () => {
      socket.off();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick(e, id) {
    setReceiverId(id);
    localStorage.setItem("mate", id);
    setReceiverName("");
    setReceiverName(e.target.textContent);
    getMessages(user.id, id, e.target.textContent);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { id, email } = user;

    const data = {
      userId: id,
      userEmail: email,
      message: input,
      from: `${user.firstname} ${user.lastname}`,
      receiverId: receiverId,
    };

    if (receiverId !== null && receiverId !== "") {
      axios.post("/api/message", data);
      setInput("");
    } else {
      alert("Select a buddy to chat with");
    }
  }

  async function getUserProfile() {
    try {
      const config = {
        headers: {
          token: localStorage.token,
        },
      };

      const res = await axios.get("/api/user", config);
      socket.emit("join", { userId: res.data.id });
      localStorage.setItem("me", res.data.id);
      setUser(res.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getMessages(userId, chatMateId, recverName) {
    try {
    const response = await axios.get(`/api/message/${userId}/${chatMateId}`);
    response.data.forEach((message) => {
        if (message.user_id !== userId) {
            message["from"] = recverName;
        }
    });
    setMessages(response.data);
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
          <div id="chat-title" className="card-shadow">
            <span>To: {receiverName}</span>
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
