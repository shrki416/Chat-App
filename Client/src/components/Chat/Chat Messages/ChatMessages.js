import React from "react";
import ChatMessage from "../Chat Message/ChatMessage";

import "./ChatMessages.css";

const messageList = [
  {
    id: 1,
    message: "Ok then",
    time: "Apr 16",
  },
  {
    id: 2,
    message:
      "Yeah I think it's best we do that. Otherwise things won't work well at all. I'm adding more text here to test the sizing of the speech bubble and the wrapping of it too.",
    time: "Apr 16",
  },
  {
    id: 3,
    message: "Maybe we can use Jim's studio.",
    time: "Apr 15",
  },
  {
    id: 4,
    message:
      "All I know is where I live it's too hard to record because of all the street noise.",
    time: "Apr 16",
  },
  {
    id: 5,
    message:
      "Well we need to work out sometime soon where we really want to record our video course.",
    time: "Apr 15",
  },
  {
    id: 6,
    message:
      "I'm just in the process of finishing off the last pieces of material for the course.",
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
    message: "Hey Daryl?",
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
