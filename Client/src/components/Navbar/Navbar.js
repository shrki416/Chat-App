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

      toast.success(`👋 ${user.firstName}`);

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        auth(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { firstname, lastname } = user;

  return (
    <div id="navbar" className="card-shadow">
      <h2>Chat-App</h2>
      <p>{user && `Welcome, ${firstname} ${lastname}!`}</p>
      <button onClick={(e) => logout(e)}>LOGOUT</button>
    </div>
  );
}

export default Navbar;
