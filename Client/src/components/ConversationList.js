import "../styles/Chat.css";

import * as timeago from "timeago.js";

import React, { useEffect, useState } from "react";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";

function ConversationList({ handleClick }) {
  const [allUserMessages, setAllUserMessages] = useState([]);


  useEffect(() => {
    getAllUsersMessages();

    // TODO: Properly clean up the useEffect
    return () => {
    //   getAllUsersMessages();
    }
  });

  async function getAllUsersMessages() {
    try {
      const response = await axios.get(`/api/userMessages`);
      setAllUserMessages(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  const conversations = allUserMessages.map((userMessage) => {
    const { id, name, email, message } = userMessage;

    const lastMessage = message.map((msg => msg.message));
    const created = message.map((msg) =>
      timeago.format(msg.created_at, "en_US")
    );

    // message.forEach((msg) => {
    //   msg["userEmail"] = email;
    //   msg["from"] = name;
    // });

    return (
      <div className="conversation" key={id}>
        <AccountCircleIcon fontSize="large" />
        <div className="title-text" onClick={(e) => handleClick(e, id)}>
          {name}
        </div>
        <div className="created-date">{created}</div>
        <div className="conversation-message">{lastMessage}</div>
      </div>
    );
  });

  return <div id="conversation-list">{conversations}</div>;
}

export default ConversationList;
