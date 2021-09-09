import React from "react";
import ChatMessage from "../Chat Message/ChatMessage";

import "./ChatMessages.css";

const messageList = [
  {
    id: 1,
    message: "How are Bran and Sansa?",
    time: "Apr 16",
  },
  {
    id: 2,
    message: "Maybe",
    time: "Apr 16",
  },
  {
    id: 3,
    message: "Maybe she just wants to get better",
    time: "Apr 15",
  },
  {
    id: 4,
    message:
      "I don't think so.  As a matter of fact she is training at the moment back in WinterFell.. I don't know why she is training so much, oh well!",
    time: "Apr 16",
  },
  {
    id: 5,
    message: "I know me too.  We can go whenever.  Is Arya going?",
    time: "Apr 15",
  },
  {
    id: 6,
    message:
      "When are we going to King's Landing? I need to see Cersei.. I can't stand the Lanestors",
    time: "Apr 14",
  },
  {
    id: 7,
    message: "How's it going?",
    time: "Apr 13",
  },
  {
    id: 8,
    message: "Hey mate what's up?",
    time: "Apr 13",
  },
  {
    id: 9,
    message: "Hey Jon?",
    time: "Apr 13",
  },
];

function ChatMessages() {
  const messages = messageList.map((message) => (
    <ChatMessage key={message.id} message={message} />
  ));

  return <div id="chat-message-list">{messages}</div>;
}

export default ChatMessages;
