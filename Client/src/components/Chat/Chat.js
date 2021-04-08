import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import socketIOClient from "socket.io-client";
import axios from "axios";

const ENDPOINT = "http://localhost:3000";

const Chat = ({ auth }) => {
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [contact, setContact] = useState("");
  const socket_ptr = useRef(null);
  const login_ptr = useRef({});
  useEffect(() => {
    var socket = socketIOClient(ENDPOINT);
    socket.on("message", (data) => {
      console.log("Server Message", data);
      setMessage(data);
      try {
        const config = {
          headers: {
            token: localStorage.token,
          },
        };

        console.log("Get User Information");
        axios.get("/api/user", config).then((res) => {
          console.log(res.data);
          login_ptr.current = res.data;
          socket.emit("login", res.data);
        });
      } catch (error) {
        console.error(error.message);
      }
    });

    socket.on("room", (data) => {
      console.log("Room Message", data);
    });

    socket.on("server", (data) => {
      setMessage(data.message + ", From : " + data.from);
    });

    socket_ptr.current = socket;
  }, []);

  const onSendMessage = () => {
    var data = {
      to: contact,
      from: login_ptr.current.email,
      message: text,
    };

    console.log("onSend Message", data);
    socket_ptr.current.emit("message", data);
  };
  return (
    <>
      <Navbar auth={auth} />

      {/* <Users /> */}
      {/* <Messages /> */}
      <p>It is message from Server {message}</p>

      <div className="input-field">
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          required="required"
          type="text"
          placeholder="Input Message"
        />
      </div>

      <div className="input-field">
        <input
          onChange={(e) => setContact(e.target.value)}
          value={contact}
          required="required"
          type="text"
          placeholder="To"
        />
      </div>

      <button
        onClick={() => {
          onSendMessage();
        }}
      >
        Echo Send
      </button>
    </>
  );
};

export default Chat;
