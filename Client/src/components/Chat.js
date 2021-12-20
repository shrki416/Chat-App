import "../styles/Chat.css";

import React, { useEffect, useRef, useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChatForm from "./ChatForm";
import ChatList from "./ChatList";
import ChatMessages from "./ChatMessages";
import ConversationList from "./ConversationList";
import Navbar from "./Navbar";
import axios from "axios";
import { io } from "socket.io-client";

const Chat = ({ auth }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [lastReceivedMessage, setLastReceivedMessage] = useState({});
  const [channels, setChannels] = useState([]);
  const channel = useRef(null);

  const setChannel = (newChannel) => (channel.current = newChannel);

  axios.defaults.headers.common = { token: localStorage.token };

  const socket = io();

  useEffect(() => {
    getUserProfile();
    getAllChannels();

    // let isMounted = true;
    // socket.on("connect", () => {
    //   if (isMounted) {
    // console.log("connected to server", socket.id);
    //   }
    // });

    socket.on("private-message", (message) => {
      //   console.log(`private-message:`, message);
      //   const mate = localStorage.getItem("mate");
      //   const me = localStorage.getItem("me");

      //   if (
      //     (message.receiver_id === mate && message.user_id === me) ||
      //     (message.receiver_id === me && message.user_id === mate)
      //   ) {
      if (!channel.current) setMessages((messages) => [...messages, message]);
      setLastReceivedMessage({ ...message });
      //   } else {
      //     setLastReceivedMessage({ ...message });
      //   }
    });

    socket.on("public-message", (data) => {
      //console.log(`public-message:==>>`, data, 'channid==>>', channel.current);
      if (data.room_id === channel.current?.id) {
        setMessages((messages) => [...messages, data]);
      }
    });

    return () => {
      socket.off();
      //   isMounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick(e, id, name) {
    setReceiverId(id);
    localStorage.setItem("mate", id);
    setReceiverName(name);
    getMessages(user.id, id, name);
    setChannel(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input) return;

    const { id, firstname, lastname } = user;

    if (!channel.current && !receiverId) {
      alert("Please select a user or a channel to send a message to");
    }

    const data = {
      userId: id,
      message: input,
      from: `${firstname} ${lastname}`,
      receiverId: receiverId,
      channelId: channel.current?.id,
    };

    if (receiverId && !channel.current) {
      axios.post("/api/message", data);
    }

    if (channel.current) {
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
      localStorage.setItem("me", res.data.id);
      setUser(res.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getAllChannels() {
    try {
      const res = await axios.get(`/api/channels`);
      setChannels(res.data);
      const generalChannel = res.data.find(
        (room) => room.room_name === "General"
      );
      if (generalChannel) {
        setChannel(generalChannel);
        getChatMessages(generalChannel);
      }
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

  async function getChatMessages(room) {
    try {
      const { data } = await axios.get(`/api/channel/${room.id}`);
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
            channels={channels}
            setChannel={setChannel}
            getChatMessages={getChatMessages}
            setReceiverId={setReceiverId}
          />
          <div id="new-message-container">
            <AddCircleIcon fontSize="large" id="add-icon" />
          </div>
          <div id="chat-title" className="shadow-light">
            {channel.current
              ? `In: ${channel.current.room_name}`
              : `To: ${receiverName}`}
          </div>
          <ChatMessages
            messageList={messages}
            user={user}
            isChannel={channel.current}
          />
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
