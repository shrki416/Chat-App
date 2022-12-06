import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
