import "../styles/Chat.css";

import * as timeago from "timeago.js";

import React, { useEffect, useState } from "react";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";

// const users = [
//   {
//     name: "John Anderson",
//     created: "1 week ago",
//     message: "Yes I love how Python does that",
//   },
// ];

function ConversationList({ handleClick }) {
  const [allUserMessages, setAllUserMessages] = useState([]);

  useEffect(() => {
    getAllUsersMessages();
  }, []);

  function getAllUsersMessages() {
    axios
      .get("/api/userMessages")
      .then((res) => setAllUserMessages(res.data))
      .catch((err) => console.log(err));
  }

  const conversations = allUserMessages.map((userMessage) => {
    const { id, firstname, lastname, email, messages } = userMessage;
    const fullName = `${firstname} ${lastname}`;

    messages.forEach((message) => {
      if (message !== null) {
        message.forEach((msg) => {
          msg["userEmail"] = email;
          msg["from"] = fullName;
        });
      }
    });

    return messages.map((message) => {
      let lastMessage = "";
      if (message !== null) {
        lastMessage = message[message.length - 1];
      }
      const { created_at, message: lastMessageText } = lastMessage;
      const created = timeago.format(created_at, "en_US");

      return (
        <div className="conversation" key={userMessage.id}>
          <AccountCircleIcon fontSize="large" />
          <div
            className="title-text"
            onClick={(e) => handleClick(e, id, messages)}
          >
            {fullName}
          </div>
          <div className="created-date">{created}</div>
          <div className="conversation-message">{lastMessageText}</div>
        </div>
      );
    });
  });

  return <div id="conversation-list">{conversations}</div>;
}

export default ConversationList;
