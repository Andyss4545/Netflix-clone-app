import React, { useState } from "react";
import "../NavBar.css";

let NavBar = () => {
  const [navbar, setNavbar] = useState(false);

  // Add window listener to display Navbar when scrolling
  const changeNavBackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeNavBackground);

  return (
    <React.Fragment>
      <div className={`nav ${navbar && "show_blacknav"}`}>
        <img
          className="nav_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />

        <img
          className="nav_avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Netflix Logo"
        />
      </div>
    </React.Fragment>
  );
};

export default NavBar;
