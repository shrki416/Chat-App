import React from "react";
import "./Navbar.css";

function Navbar({ auth, user }) {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    auth(false);
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
