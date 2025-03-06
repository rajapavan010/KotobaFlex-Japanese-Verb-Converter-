import React from "react";
import Navbar from "./Navbar"; // Import Navbar
import Footer from "./Footer"; // Import Footer

const Layout = ({ children }) => {
  return (
    <div className="home-container">
      <Navbar /> {/* Reusable Navbar */}
      <div className="home-main">{children}</div> {/* Dynamic content */}
      <Footer /> {/* Reusable Footer */}
    </div>
  );
};

export default Layout;
