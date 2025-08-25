import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="app-footer">
      <p>&copy; {currentYear} FinTrack. All Rights Reserved.</p>
      <p>Made by Shiv Patel</p>
      <p>
        Contact :{" "}
        <b>
          {" "}
          <i> pshiv2411@gmail.com </i>{" "}
        </b>{" "}
      </p>
    </footer>
  );
}

export default Footer;
