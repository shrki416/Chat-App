import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "./Chat.css";
import axios from "axios";
import * as timeago from "timeago.js";

// const users = [
//   {
//     name: "John Anderson",
//     created: "1 week ago",
//     message: "Yes I love how Python does that",
//   },
//   {
//     name: "Ben Smith",
//     created: "2:49 PM",
//     message: "Yeah Miami Heat are done",
//   },
//   {
//     name: "Douglas Johannasen",
//     created: "6:14 PM",
//     message: "No it does not",
//   },
//   {
//     name: "Jacob Manly",
//     created: "3 secs ago",
//     message: "Just be very careful doing that",
//   },
//   {
//     name: "Stacey Wilson",
//     created: "30 mins ago",
//     message: "Awesome!!! Congratulations!!!!",
//   },
//   {
//     name: "Stan George",
//     created: "1 week ago",
//     message: "Good job",
//   },
//   {
//     name: "Sarah Momes",
//     created: "1 year ago",
//     message: "Thank you. I appreciate that.",
//   },
//   {
//     name: "Kim O'Neil",
//     created: "2 days ago",
//     message: "Very funny",
//   },
//   {
//     name: "Jon Snow",
//     created: "Apr 16",
//     message: "This is a message",
//   },
// ];

function ConversationList() {
  const [allUserMessages, setAllUserMessages] = useState([]);

  useEffect(() => {
    getAllUsersMessages();
  }, [allUserMessages]);

  function getAllUsersMessages() {
    axios.get("/api/userMessages").then((res) => setAllUserMessages(res.data));
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
          <div className="title-text">{fullName}</div>
          <div className="created-date">{created}</div>
          <div className="conversation-message">{lastMessageText}</div>
        </div>
      );
    });
  });

  // const conversations = users.map((convo, index) => {
  //   return (
  //     <div className="conversation" key={`${convo.created}_${index}`}>
  //       <AccountCircleIcon fontSize="large" />
  //       <div className="title-text">{convo.name}</div>
  //       <div className="created-date">{convo.created}</div>
  //       <div className="conversation-message">{convo.message}</div>
  //     </div>
  //   );
  // });

  return <div id="conversation-list">{conversations}</div>;
}

export default ConversationList;
