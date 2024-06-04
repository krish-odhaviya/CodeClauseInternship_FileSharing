import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="Header">
      <h2 className="logo-text">ShareEase</h2>
      <nav className="Nav">
        <a href="#Home" fontSize={["sm", "md", "lg"]}>
          Home
        </a>
        <a href="#Uploaded-links" fontSize={["sm", "md", "lg"]}>
          Uploaded links
        </a>
        <button
          fontSize={["sm", "md", "lg"]}
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
