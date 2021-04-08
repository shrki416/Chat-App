import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import socketIOClient from "socket.io-client";
import axios from "axios";
import "./Chat.css";

const ENDPOINT = "http://localhost:3000";

const Chat = ({ auth }) => {
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [contact, setContact] = useState("");
  const socket_ptr = useRef(null);
  const login_ptr = useRef({});

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
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

    socket.on("room", (data) => console.log("Room Message", data));

    socket.on("server", (data) =>
      setMessage(`${data.message}, From : ${data.from}`)
    );

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

      <section className="msger">
        <header classNameName="msger-header">
          <div classNameName="msger-header-title">
            <i classNameName="fas fa-comment-alt"></i> SimpleChat
          </div>
          <div classNameName="msger-header-options">
            <span>
              <i classNameName="fas fa-cog"></i>
            </span>
          </div>
        </header>

        <main classNameName="msger-chat">
          <div classNameName="msg left-msg">
            <div
              classNameName="msg-img"
              // style="background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)"
            ></div>

            <div classNameName="msg-bubble">
              <div classNameName="msg-info">
                <div classNameName="msg-info-name">BOT</div>
                <div classNameName="msg-info-time">12:45</div>
              </div>

              <div classNameName="msg-text">
                Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
              </div>
            </div>
          </div>

          <div classNameName="msg right-msg">
            <div
              classNameName="msg-img"
              // style="background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg)"
            ></div>

            <div classNameName="msg-bubble">
              <div classNameName="msg-info">
                <div classNameName="msg-info-name">Sajad</div>
                <div classNameName="msg-info-time">12:46</div>
              </div>

              <div classNameName="msg-text">
                You can change your name in JS section!
              </div>
            </div>
          </div>
        </main>

        <form className="msger-inputarea">
          <input
            type="text"
            className="msger-input"
            placeholder="Enter your message..."
          />
          <button
            className="msger-send-btn"
            onClick={() => {
              onSendMessage();
            }}
          >
            Send
          </button>
        </form>
      </section>

      {/* <p>It is message from Server {message}</p>

      <div classNameNameName="input-field">
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          required="required"
          type="text"
          placeholder="Input Message"
        />
      </div>

      <div classNameNameName="input-field">
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
      </button> */}
    </>
  );
};

export default Chat;
