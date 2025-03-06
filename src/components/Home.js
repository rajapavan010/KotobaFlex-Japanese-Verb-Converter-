import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout"; // Import the Layout component
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="home-box-container">
        <div className="home-box" onClick={() => navigate("/n5")}>
          <img src="/assets/n5.jpg" alt="N5" className="home-box-img" />
        </div>
        <div className="home-box" onClick={() => navigate("/n4")}>
          <img src="/assets/n4.jpg" alt="N4" className="home-box-img" />
        </div>
        <div className="home-box" onClick={() => navigate("/n3")}>
          <img src="/assets/n3.jpg" alt="N3" className="home-box-img" />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
