import React from "react";
import Header from "./Header";
import Chat from "./Chat";
import Footer from "./Footer";

import "../App.css";

const App = () =>
    (
        <div className="chat-app">
            <Header/>
            <Chat/>
            <Footer/>
        </div>
    );

export default App;
