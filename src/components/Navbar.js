import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Keep styling

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="home-navbar">
      <div className="home-left">
        <button className="home-button" onClick={() => navigate("/")}>
          <img src="/assets/home.png" alt="Home" className="home-icon" />
        </button>
        <span className="home-title">KotobaFlex</span>
      </div>
      <p className="home-description">
        KotobaFlex: A beginner-friendly tool to easily learn and understand Japanese verb conjugations.
      </p>
      <div className="home-right">
        <img src="/assets/logo.png" alt="Logo" className="home-logo" />
      </div>
    </div>
  );
};

export default Navbar;
