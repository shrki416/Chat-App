import React from "react";

const Messages = props => {
  return (
    <div className="messages">
      <h2>Messages</h2>
      <p>{props.message.name}</p>
      <p>{props.message.message}</p>
      {/* <p>Ahmed: So glad this chat is up and running!</p>
      <p>
        <strong>You:</strong> I know, me too!
      </p>
      <p>
        <strong>You:</strong> This is a lot of fun
      </p> */}
    </div>
  );
};

export default Messages;
