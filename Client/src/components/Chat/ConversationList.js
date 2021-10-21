import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "./Chat.css";
import axios from "axios";
import * as timeago from "timeago.js";

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
    const { firstname, lastname, messages } = userMessage;
    const fullName = `${firstname} ${lastname}`;

    return messages.map((message) => {
      const lastMessage = message[message.length - 1];
      const { created_at, message: lastMessageText } = lastMessage;
      const created = timeago.format(created_at, "en_US");

      return (
        <div className="conversation" key={userMessage.id}>
          <AccountCircleIcon fontSize="large" />
          <div className="title-text" onClick={(e) => handleClick(e)}>
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
