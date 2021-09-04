import React from "react";
import Navbar from "../Navbar/Navbar";
import SendIcon from "@material-ui/icons/Send";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "./Chat.css";

const Chat = ({ auth }) => {
  return (
    <>
      <Navbar auth={auth} />

      <div className="chat">
        <div id="chat-container">
          <div id="search-container">
            <input type="text" name="search-message-box" placeholder="Search" />
          </div>
          <div id="conversation-list">
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Jon Snow</div>
              <div className="created-date">Apr 16</div>
              <div className="conversation-message">This is a message</div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Kim O'Neil</div>
              <div className="created-date">2 days ago</div>
              <div className="conversation-message">Very funny</div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">John Anderson</div>
              <div className="created-date">1 week ago</div>
              <div className="conversation-message">
                Yes I love how Python does that
              </div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Ben Smith</div>
              <div className="created-date">2:49 PM</div>
              <div className="conversation-message">
                Yeah Miami Heat are done
              </div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Douglas Johannasen</div>
              <div className="created-date">6:14 PM</div>
              <div className="conversation-message">No it does not</div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Jacob Manly</div>
              <div className="created-date">3 secs ago</div>
              <div className="conversation-message">
                Just be very careful doing that
              </div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Stacey Wilson</div>
              <div className="created-date">30 mins ago</div>
              <div className="conversation-message">
                Awesome!!! Congratulations!!!!
              </div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Stan George</div>
              <div className="created-date">1 week ago</div>
              <div className="conversation-message">Good job</div>
            </div>
            <div className="conversation">
              <AccountCircleIcon fontSize="large" />
              <div className="title-text">Sarah Momes</div>
              <div className="created-date">1 year ago</div>
              <div className="conversation-message">
                Thank you. I appreciate that.
              </div>
            </div>
          </div>
          <div id="new-message-container">
            <AddCircleIcon fontSize="large" id="add-icon" />
          </div>
          <div id="chat-title">
            <span>Jon Snow</span>
            <DeleteIcon fontSize="large" id="delete-icon" />
          </div>
          <div id="chat-message-list">
            <div className="message-row you-message">
              <div className="message-content">
                <div className="message-text">Ok then</div>
                <div className="message-time">Apr 16</div>
              </div>
            </div>
            <div className="message-row other-message">
              <div className="message-content">
                <div className="message-text card-shadow">
                  Yeah I think it's best we do that. Otherwise things won't work
                  well at all. I'm adding more text here to test the sizing of
                  the speech bubble and the wrapping of it too.
                </div>
                <div className="message-time">Apr 16</div>
              </div>
            </div>
            <div className="message-row you-message">
              <div className="message-content">
                <div className="message-text">
                  Maybe we can use Jim's studio.
                </div>
                <div className="message-time">Apr 15</div>
              </div>
            </div>
            <div className="message-row other-message">
              <div className="message-content">
                <div className="message-text">
                  All I know is where I live it's too hard to record because of
                  all the street noise.
                </div>
                <div className="message-time">Apr 16</div>
              </div>
            </div>
            <div className="message-row you-message">
              <div className="message-content">
                <div className="message-text">
                  Well we need to work out sometime soon where we really want to
                  record our video course.
                </div>
                <div className="message-time">Apr 15</div>
              </div>
            </div>
            <div className="message-row other-message">
              <div className="message-content">
                <div className="message-text">
                  I'm just in the process of finishing off the last pieces of
                  material for the course.
                </div>
                <div className="message-time">Apr 14</div>
              </div>
            </div>
            <div className="message-row you-message">
              <div className="message-content">
                <div className="message-text">How's it going?</div>
                <div className="message-time">Apr 13</div>
              </div>
            </div>
            <div className="message-row other-message">
              <div className="message-content">
                <div className="message-text">Hey mate what's up?</div>
                <div className="message-time">Apr 13</div>
              </div>
            </div>
            <div className="message-row you-message">
              <div className="message-content">
                <div className="message-text">Hey Daryl?</div>
                <div className="message-time">Apr 13</div>
              </div>
            </div>
          </div>
          <div id="chat-form">
            <input type="text" placeholder="type a message..." />
            <SendIcon alt="send message" id="send-icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
