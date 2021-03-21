import React, { useState, useEffect } from "react";
import axios from "axios";
// import Messages from "./Messages";
// import Users from "./Users";

const Chat = ({ auth }) => {
  const [name, setName] = useState("");

  const getUserProfile = async () => {
    try {
      const config = {
        headers: {
          token: localStorage.token,
        },
      };

      await axios.get("/api/user", config).then((res) => setName(res.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  const { firstname, lastname } = name;

  useEffect(() => getUserProfile(), []);

  return (
    <div>
      <h1>Chat</h1>
      <h4>
        Welcome {lastname}, {firstname}
      </h4>
      {/* <Messages />
      <Users /> */}
    </div>
  );
};

export default Chat;
