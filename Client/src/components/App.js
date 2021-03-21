import React, { useEffect, useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Chat from "../components/Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "../App.css";
import axios from "axios";

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  // const authenticateUser = (Boolean) => setIsUserAuthenticated(Boolean);

  // const userAuth = async () => {
  //   try {
  //     const response = await axios.get("/api/verify");
  //     response ? setIsUserAuthenticated(true) : setIsUserAuthenticated(false);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // useEffect(() => authenticateUser(), []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route render={() => <h1>404 page not found</h1>} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
