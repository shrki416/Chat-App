import "../styles/App.css";

import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Chat from "./Chat";
import Login from "../components/Login";
import Register from "../components/Register";
import axios from "axios";

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const authenticateUser = (Boolean) => setIsUserAuthenticated(Boolean);

  const userAuth = async () => {
    console.log("🍌");
    try {
      const config = {
        headers: { token: localStorage.token },
      };
      const response = await axios.get("/api/verify", config);
      response.status === 200
        ? setIsUserAuthenticated(true)
        : setIsUserAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => userAuth(), []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isUserAuthenticated ? (
                <Chat auth={authenticateUser} />
              ) : (
                <Login auth={authenticateUser} />
              )
            }
          />
          <Route
            path="/login"
            element={
              isUserAuthenticated ? (
                <Chat auth={authenticateUser} />
              ) : (
                <Login auth={authenticateUser} />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isUserAuthenticated ? (
                <Register />
              ) : (
                <Login auth={authenticateUser} />
              )
            }
          />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <h1>404</h1>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
