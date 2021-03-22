import React, { useEffect, useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Chat from "../components/Chat";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "../App.css";
import axios from "axios";

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const authenticateUser = (Boolean) => setIsUserAuthenticated(Boolean);

  const userAuth = async () => {
    try {
      const config = {
        headers: { token: localStorage.token },
      };
      const response = await axios.get("/api/verify", config);
      response ? setIsUserAuthenticated(true) : setIsUserAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => userAuth(), []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              isUserAuthenticated ? (
                <Chat {...props} auth={authenticateUser} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isUserAuthenticated ? (
                <Login {...props} auth={authenticateUser} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isUserAuthenticated ? (
                <Register {...props} auth={authenticateUser} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route render={() => <h1>404 page not found</h1>} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
