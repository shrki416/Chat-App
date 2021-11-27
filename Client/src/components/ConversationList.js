import "../styles/Chat.css";

import React, { useEffect, useState } from "react";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";

// import * as timeago from "timeago.js";

// const users = [
//   {
//     name: "John Anderson",
//     created: "1 week ago",
//     message: "Yes I love how Python does that",
//   },
// ];

function ConversationList({ handleClick }) {
    const [users, setUsers] = useState([]);
//   const [allUserMessages, setAllUserMessages] = useState([]);

  useEffect(() => {
    // getAllUsersMessages();
    test();
    getUsers();
  }, []);

  async function getUsers() {
    try {
        const response = await axios.get(`/api/users`)
        console.log(`🍎`, response.data);
        // setUsers(response.data);
    } catch (error) {
        console.log(error.message);
    }
  }

  function test() {
    const id = localStorage.getItem("me");
    console.log(id);
    axios
      .get(`/api/userMessages/${id}`)
      .then((res) => {
          console.log(`🍆`, res);
        //   setAllUserMessages(res.data)
        })
      .catch((err) => console.log(err));
  }


//   function getAllUsersMessages() {
//     axios
//       .get(`/api/userMessages`)
//       .then((res) => setAllUserMessages(res.data))
//       .catch((err) => console.log(err));
//   }

//   const conversations = allUserMessages.map((userMessage) => {
//     const { id, firstname, lastname, email, messages } = userMessage;
//     const fullName = `${firstname} ${lastname}`;

//     messages.forEach((message) => {
//       if (message !== null) {
//         message.forEach((msg) => {
//           msg["userEmail"] = email;
//           msg["from"] = fullName;
//         });
//       }
//     });

//     return messages.map((message) => {
//       let lastMessage = "";
//       if (message !== null) {
//         lastMessage = message[message.length - 1];
//       }
//       const { created_at, message: lastMessageText } = lastMessage;
//       const created = timeago.format(created_at, "en_US");

//       return (
//         <div className="conversation" key={userMessage.id}>
//           <AccountCircleIcon fontSize="large" />
//           <div
//             className="title-text"
//             onClick={(e) => handleClick(e, id, messages)}
//           >
//             {fullName}
//           </div>
//           <div className="created-date">{created}</div>
//           <div className="conversation-message">{lastMessageText}</div>
//         </div>
//       );
//     });
//   });

//   return <div id="conversation-list">{conversations}</div>;
    return (
        <div id="conversation-list">
            <div className="conversation">
            <AccountCircleIcon fontSize="large" />
            <div
                className="title-text"
                // onClick={(e) => handleClick(e, id, messages)}
            >
                {users.map(({firstname, lastname}) => `${firstname} ${lastname}`)}
            </div>
            <div className="created-date">test date</div>
            <div className="conversation-message">test message</div>
            </div>
        </div>
    );
}

export default ConversationList;
