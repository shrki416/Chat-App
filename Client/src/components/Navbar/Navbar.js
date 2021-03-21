import React, { useState, useEffect } from "react";
// import FaUser from "react-icons/fa";
import axios from "axios";
import "./Navbar.css";

function Navbar() {
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

  useEffect(() => getUserProfile(), []);
  return (
    <div id="navbar" className="card-shadow">
      <h2>Chat-App</h2>
      {/* <img height="40px" width="40px" src={FaUser} alt="Avatar" /> */}
      <p>
        {lastname}, {firstname}
      </p>
    </div>
  );
}

export default Navbar;
