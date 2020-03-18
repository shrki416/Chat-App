import React from "react";
import add from "../assets/add-icon.png";

const AddUser = () => {
  return (
    <div className="chat-container-add-user">
      <button className="add-user-btn" type="submit">
        Add User <img src={add} />
      </button>
    </div>
  );
};

export default AddUser;
