import React from "react";
import add from "../assets/add-icon.png";

const AddUser = () => {
  const handleClick = e => {
    console.log("user added");
  };

  return (
    <button className="add-user" onClick={handleClick}>
      <img src={add} /> Add User
    </button>
  );
};

export default AddUser;
