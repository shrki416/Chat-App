import React from "react";
import "./Navbar.css";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar({ auth, user }) {
  const logout = async (e) => {
    e.preventDefault();

    try {
      const email = localStorage.getItem("email");
      const response = await axios.post("/api/logout", { email });

      toast.success(<h3>👋 {response.data.message}</h3>);

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        auth(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="navbar" className="card-shadow">
      <h2>Chat-App</h2>
      <p>{user && `Welcome, ${user.firstname} ${user.lastname}!`}</p>
      <button onClick={(e) => logout(e)}>LOGOUT</button>
    </div>
  );
}

export default Navbar;
