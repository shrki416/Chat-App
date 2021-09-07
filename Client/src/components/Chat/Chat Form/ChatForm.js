import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

import "./ChatForm.css";

function ChatForm({ handleSubmit, setInput, input }) {
  return (
    <form id="chat-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        placeholder="type a message..."
        onChange={(e) => setInput(e.target.value)}
      />
      <IconButton onClick={handleSubmit}>
        <SendIcon alt="send message" id="send-icon" />
      </IconButton>
    </form>
  );
}

export default ChatForm;
