import "../styles/Chat.css";

import React, { useEffect, useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChatForm from "./ChatForm";
import ChatList from "./ChatList";
import ChatMessages from "./ChatMessages";
import ConversationList from "./ConversationList";
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
  const [isChannel, setIsChannel] = useState(false);
  const [channel, setChannel] = useState("");
  const [channels] = useState(["Programming", "General", "Random"]);
  const [channelId, setChannelId] = useState("");

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

  socket.on("channel", (data) => {
    setMessages((messages) => [...messages, data]);
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

  function handleClick(e, id, name) {
    setReceiverId(id);
    localStorage.setItem("mate", id);
    setReceiverName("");
    setReceiverName(name);
    getMessages(user.id, id, name);
    setIsChannel(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input) return;

    const { id, email, firstname, lastname } = user;

    const data = {
      userId: id,
      userEmail: email,
      message: input,
      from: `${firstname} ${lastname}`,
      receiverId: receiverId,
      channel: channel,
      channelId: channelId,
    };

    if (!isChannel && !receiverId) {
      alert("Please select a user or a channel to send a message to");
    }

    if (receiverId !== null && receiverId !== "") {
      axios.post("/api/message", data);
    }

    if (isChannel) {
      axios.post("/api/channel", data);
    }

    setInput("");
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

  async function getChannelId(channel) {
    try {
      const res = await axios.get(`/api/channel/id/${channel}`);
      setChannelId(res.data);
      socket.emit("room", { channel: res.data });
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getMessages(userId, chatMateId, recieverName) {
    try {
      const { data } = await axios.get(`/api/message/${userId}/${chatMateId}`);
      data.map((message) => {
        if (message.user_id !== userId) {
          message.from = recieverName;
        }
        return message;
      });
      setMessages(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getChatMessages(channel) {
    const config = {
      headers: {
        token: localStorage.token,
      },
    };
    try {
      const { data } = await axios.get(`/api/channel/${channel}`, config);
      setMessages(data);
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
          <ChatList
            setIsChannel={setIsChannel}
            channels={channels}
            setChannel={setChannel}
            getChatMessages={getChatMessages}
            getChannelId={getChannelId}
          />
          <div id="new-message-container">
            <AddCircleIcon fontSize="large" id="add-icon" />
          </div>
          <div id="chat-title" className="shadow-light">
            {isChannel ? `In: ${channel}` : `To: ${receiverName}`}
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
