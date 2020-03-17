import React from "react";
import github from "./assets/github-icon.png";
import website from "./assets/website-icon.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <p>
        <a href="https://aa-dev.io">
          <img className="social-img" src={website} />
        </a>
      </p>
      <div>
        <h5>Developed with ❤️ by AA</h5>
        <p>©️ {year}</p>
      </div>
      <p>
        <a href="https://github.com/shrki416">
          <img className="social-img" src={github} />
        </a>
      </p>
    </div>
  );
};

export default Footer;
