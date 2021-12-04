import "../styles/Chat.css";

import * as timeago from "timeago.js";

import React, { useEffect, useState } from "react";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";

function ConversationList({ handleClick, lastReceivedMessage }) {
  const [messageMetaData, setMessageMetaData] = useState([]);
  const LOGGED_IN_USER = localStorage.getItem("me");
  const checkForNewMessages = JSON.stringify(lastReceivedMessage);

  useEffect(() => {
    async function getUserLastMessage() {
      try {
        const response = await axios.get(`/api/userMessages`);
        setMessageMetaData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }

    getUserLastMessage();
  }, [checkForNewMessages]);

  const conversations = messageMetaData.map((userMessage) => {
    const { id, name, active, message } = userMessage;

    const lastMessage = message.map((msg) => msg.message);
    const created = message.map((msg) =>
      timeago.format(msg.created_at, "en_US")
    );
    const sender = message.map((msg) => msg.receiverId);
    console.log(sender);

    if (LOGGED_IN_USER === id) {
      return null;
    }

    return (
      <div className="conversation" key={id}>
        <AccountCircleIcon fontSize="large" />
        <div className="title-text" onClick={(e) => handleClick(e, id)}>
          {name} <span className={`${active ? "online" : "offline"}`}></span>
        </div>
        <div className="created-date">{created}</div>
        <div className="conversation-message">{lastMessage}</div>
      </div>
    );
  });

  return <div id="conversation-list">{conversations}</div>;
}

export default ConversationList;
