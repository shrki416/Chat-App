import '../styles/Chat.css';

import React from 'react'

function ChatList() {
    return (
      <div id="chat-list">
      <h2>Channels</h2>
        <div className='conversation'>Programming</div>
        <div className='conversation'>General</div>
        <div className='conversation'>Running</div>
      </div>
    );
}

export default ChatList;
