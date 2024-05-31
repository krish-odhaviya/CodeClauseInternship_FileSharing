import React from "react";
import "./Header.css";
import Logout from "../../pages/Logout";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="Header">
      <h2 className="logo-text">ShareEase</h2>
      <nav className="Nav">
        <a href="#Home">Home</a>
        <a href="#Uploaded-links">Uploded links</a>
        <button
          className="btn"
          onClick={() => {
            navigate("/logout");
          }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
