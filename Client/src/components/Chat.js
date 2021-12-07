import "../styles/Chat.css";

import React, { useEffect, useState } from "react";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import ChatForm from "./ChatForm";
import ChatList from "./ChatList";
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
  const [lastReceivedMessage, setLastReceivedMessage] = useState({});

  const socket = io();

  socket.on("message", (message) => {
    const mate = localStorage.getItem("mate");
    const me = localStorage.getItem("me");

    if (
      (message.receiver_id === mate && message.user_id === me) ||
      (message.receiver_id === me && message.user_id === mate)
    ) {
      setMessages((messages) => [...messages, message]);
      setLastReceivedMessage({ ...message });
    } else {
      setLastReceivedMessage({ ...message });
    }
  });

  useEffect(() => {
    let isMounted = true;
    socket.on("connect", () => {
      if (isMounted) {
        console.log("connected to server", socket.id);
        getUserProfile();
      }
    });

    return () => {
      isMounted = false;
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

    const { id, email, firstname, lastname } = user;

    const data = {
      userId: id,
      userEmail: email,
      message: input,
      from: `${firstname} ${lastname}`,
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
          <ConversationList
            handleClick={handleClick}
            lastReceivedMessage={lastReceivedMessage}
          />
          <ChatList />
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
