import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "./Chat.css";
import axios from "axios";

const users = [
  {
    name: "John Anderson",
    created: "1 week ago",
    message: "Yes I love how Python does that",
  },
  {
    name: "Ben Smith",
    created: "2:49 PM",
    message: "Yeah Miami Heat are done",
  },
  {
    name: "Douglas Johannasen",
    created: "6:14 PM",
    message: "No it does not",
  },
  {
    name: "Jacob Manly",
    created: "3 secs ago",
    message: "Just be very careful doing that",
  },
  {
    name: "Stacey Wilson",
    created: "30 mins ago",
    message: "Awesome!!! Congratulations!!!!",
  },
  {
    name: "Stan George",
    created: "1 week ago",
    message: "Good job",
  },
  {
    name: "Sarah Momes",
    created: "1 year ago",
    message: "Thank you. I appreciate that.",
  },
  {
    name: "Kim O'Neil",
    created: "2 days ago",
    message: "Very funny",
  },
  {
    name: "Jon Snow",
    created: "Apr 16",
    message: "This is a message",
  },
];

const conversations = users.map((convo, index) => {
  return (
    <div className="conversation" key={`${convo.created}_${index}`}>
      <AccountCircleIcon fontSize="large" />
      <div className="title-text">{convo.name}</div>
      <div className="created-date">{convo.created}</div>
      <div className="conversation-message">{convo.message}</div>
    </div>
  );
});

function ConversationList() {
  const [allUserMessages, setAllUserMessages] = useState([]);

  function getAllUsersMessages() {
    const allUserMessages = axios
      .get("/api/userMessages")
      .then((res) => setAllUserMessages(res.data));
  }

  console.log(sorted);

  useEffect(() => {
    getAllUsersMessages();
  }, []);

  return <div id="conversation-list">{conversations}</div>;
}

export default ConversationList;
