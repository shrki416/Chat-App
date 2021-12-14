import "../styles/Chat.css";

import * as timeago from "timeago.js";

import React, { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { io } from "socket.io-client";
import { styled } from "@mui/material/styles";

const socket = io();

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: `${theme.isActive.backgroundColor}`,
    color: `${theme.isActive.color}`,
    boxShadow: `0 0 0 2px ${theme.isActive.backgroundColor}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
}));

function ConversationList({ handleClick, lastReceivedMessage }) {
  const [messageMetaData, setMessageMetaData] = useState([]);
  const LOGGED_IN_USER = localStorage.getItem("me");
  const checkForNewMessages = JSON.stringify(lastReceivedMessage);
  const [active, setActive] = useState([]);

  useEffect(() => {
    async function getUserLastMessage() {
      try {
        const { data } = await axios.get(`/api/userMessages`);
        setMessageMetaData(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    getUserLastMessage();
  }, [checkForNewMessages]);

  useEffect(() => {
    let isMounted = true;

    async function getActiveUsers() {
      try {
        const { data } = await axios.get(`/api/user/active`);
        if (isMounted) setActive(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    socket.on("login", () => getActiveUsers());
    socket.on("logout", () => getActiveUsers());

    getActiveUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  function stringToColor(string) {
    let hash = 0;
    let i;

    // /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const conversations = messageMetaData.map((userMessage) => {
    const { id, name, message } = userMessage;

    const isActive = active.map((user) => user.id).includes(id);

    const lastMessage = message.map((msg) => {
      return msg?.receiverId === LOGGED_IN_USER
        ? `💬 ${msg?.message}`
        : "no new messages";
    });

    const created = message.map((msg) =>
      timeago.format(msg?.created_at, "en_US")
    );

    if (LOGGED_IN_USER === id) {
      return null;
    }

    return (
      <div
        className="conversation"
        key={id}
        onClick={(e) => handleClick(e, id, name)}
      >
        <Stack direction="row" spacing={2}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            theme={{
              isActive: {
                backgroundColor: isActive ? "var(--success)" : "var(--danger)",
                color: isActive ? "var(--success)" : "var(--danger)",
              },
            }}
          >
            <Avatar {...stringAvatar(name)} />
          </StyledBadge>
        </Stack>
        <div className="title-text">{name}</div>
        <div className="created-date">{created}</div>
        <div className="conversation-message">{lastMessage}</div>
      </div>
    );
  });

  return <div id="conversation-list">{conversations}</div>;
}

export default ConversationList;
