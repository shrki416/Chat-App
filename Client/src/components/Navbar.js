import "../styles/Navbar.css";

import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar({ auth, user }) {
  const logout = async (e) => {
    e.preventDefault();

    try {
      const { email } = user;
      const response = await axios.post("/api/logout", { email });

      toast.success(<h3>{response.data.message}</h3>);

      if (response.status === 200) {
        localStorage.removeItem("token", "email");
        auth(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="navbar" className="card-shadow">
      <h1>Chat-App</h1>
      <p>{user && `Welcome, ${user.firstname} ${user.lastname}!`}</p>
      <button onClick={(e) => logout(e)}>LOGOUT</button>
    </div>
  );
}

export default Navbar;
