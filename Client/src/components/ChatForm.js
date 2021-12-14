import "../styles/ChatForm.css";

import IconButton from "@mui/material/IconButton";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

function ChatForm({ handleSubmit, setInput, input }) {
  return (
    <form id="chat-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        placeholder="type a message..."
        onChange={(e) => setInput(e.target.value)}
      />
      <IconButton>
        <InsertEmoticonIcon id="emoji-icon" />
      </IconButton>
      <IconButton onClick={handleSubmit}>
        <SendIcon alt="send message" id="send-icon" />
      </IconButton>
    </form>
  );
}

export default ChatForm;
