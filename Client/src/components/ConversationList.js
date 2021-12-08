import "../styles/Chat.css";

import * as timeago from "timeago.js";

import React, { useEffect, useState } from "react";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io();

function ConversationList({ handleClick, lastReceivedMessage }) {
  const [messageMetaData, setMessageMetaData] = useState([]);
  const LOGGED_IN_USER = localStorage.getItem("me");
  const checkForNewMessages = JSON.stringify(lastReceivedMessage);
  const [active, setActive] = useState([]);

  useEffect(() => {
    async function getUserLastMessage() {
      try {
        const { data } = await axios.get(`/api/userMessages`);
        setMessageMetaData(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    getUserLastMessage();
  }, [checkForNewMessages]);

  useEffect(() => {
    let isMounted = true;

    async function getActiveUsers() {
      try {
        const { data } = await axios.get(`/api/user/active`);
        if (isMounted) setActive(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    socket.on("login", () => getActiveUsers());
    socket.on("logout", () => getActiveUsers());

    getActiveUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const conversations = messageMetaData.map((userMessage) => {
    const { id, name, message } = userMessage;

    const isActive = active.map((user) => user.id).includes(id);

    const lastMessage = message.map((msg) => {
      return msg.receiverId === LOGGED_IN_USER
        ? `💬 ${msg.message}`
        : "no new messages";
    });

    const created = message.map((msg) =>
      timeago.format(msg.created_at, "en_US")
    );

    if (LOGGED_IN_USER === id) {
      return null;
    }

    return (
      <div
        className="conversation"
        key={id}
        onClick={(e) => handleClick(e, id, name)}
      >
        <AccountCircleIcon fontSize="large" />
        <div className="title-text">
          {name} <span className={`${isActive ? "online" : "offline"}`}></span>
        </div>
        <div className="created-date">{created}</div>
        <div className="conversation-message">{lastMessage}</div>
      </div>
    );
  });

  return <div id="conversation-list">{conversations}</div>;
}

export default ConversationList;
