import "../styles/Chat.css";

import * as timeago from "timeago.js";

import React, { useEffect, useState } from "react";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";

function ConversationList({ handleClick, lastReceivedMessage }) {
  const [messageMetaData, setMessageMetaData] = useState([]);
  const LOGGED_IN_USER = localStorage.getItem("me");

  useEffect(() => {
    async function getUserLastMessage() {
      try {
        const response = await axios.get(`/api/userMessages`);
        setMessageMetaData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }

    getUserLastMessage();
  }, []);

  console.log({ messageMetaData })

  useEffect(() => {

     if( lastReceivedMessage.receiver_id){
          const me  = localStorage.getItem("me");

          let modiList = [...messageMetaData];

          console.log({lastReceivedMessage});
         modiList.length &&
           modiList.forEach((item, index) => {
             console.log(item);

             if (
               (item.id === lastReceivedMessage.receiver_id  && me === lastReceivedMessage.user_id)||
               (item.id === lastReceivedMessage.user_id && me === lastReceivedMessage.receiver_id)
             ) {
               modiList[index].message = [
                 {
                   ...lastReceivedMessage,
                   receiverId: lastReceivedMessage.receiver_id,
                 },
               ];
             }

           });
        setMessageMetaData(modiList)

     }


  }, [JSON.stringify(lastReceivedMessage)]);

  const conversations = messageMetaData.map((userMessage) => {
    const { id, name, active, message } = userMessage;

    const lastMessage = message.map((msg) => msg.message);
    const created = message.map((msg) =>
      timeago.format(msg.created_at, "en_US")
    );

    if (LOGGED_IN_USER === id) {
      return null;
    }

    const receivedByMe = message[0]?.receiverId === id;

// console.log({ userMessage, receivedByMe, message: message[0], id });

    return (
      <div className="conversation" key={id}>
        <AccountCircleIcon fontSize="large" />
        <div className="title-text" onClick={(e) => handleClick(e, id)}>
          {name} <span className={`${ active ? "online" : "offline"}`}></span>
        </div>
        <div className="created-date">{created}</div>
        <div className="conversation-message">{receivedByMe ? 'Sent:' : 'Received:'} {lastMessage}</div>
      </div>
    );
  });

  return <div id="conversation-list">{conversations}</div>;
}

export default ConversationList;
