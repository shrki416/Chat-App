import React, { useState, useEffect } from "react";
// import FaUser from "react-icons/fa";
import axios from "axios";
import "./Navbar.css";

function Navbar({ auth }) {
  const [name, setName] = useState("");

  const getUserProfile = async () => {
    try {
      const config = {
        headers: {
          token: localStorage.token,
        },
      };

      await axios.get("/api/user", config).then((res) => setName(res.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  const { firstname, lastname } = name;

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    // auth(false);
  };

  useEffect(() => getUserProfile(), []);
  return (
    <div id="navbar" className="card-shadow">
      <h2>Chat-App</h2>
      {/* <img height="40px" width="40px" src={FaUser} alt="Avatar" /> */}
      <p>
        Welcome: {lastname}, {firstname}
      </p>
      {/* <button onClick={(e) => logout(e)}>LOGOUT</button>s */}
    </div>
  );
}

export default Navbar;
