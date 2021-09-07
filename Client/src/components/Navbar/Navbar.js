import React from "react";
import "./Navbar.css";

function Navbar({ auth }) {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    auth(false);
  };

  return (
    <div id="navbar" className="card-shadow">
      <h2>Chat-App</h2>
      <button onClick={(e) => logout(e)}>LOGOUT</button>
    </div>
  );
}

export default Navbar;
