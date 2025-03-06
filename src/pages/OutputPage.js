import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout"; // Use Layout
import "../components/Converter.css"; // Reusing styles from Converter

const OutputPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data passed via navigation
  const { originalText, convertedText } = location.state || {
    originalText: "No input provided",
    convertedText: "No conversion done",
  };

  return (
    <Layout>
      <div className="converter-container">
        <h2>Conversion Result</h2>

        {/* Original Text */}
        <div className="output-group">
          <label className="output-label">Original Text:</label>
          <div className="output-box">{originalText}</div>
        </div>

        {/* Converted Text */}
        <div className="output-group">
          <label className="output-label">Converted Text:</label>
          <div className="output-box">{convertedText}</div>
        </div>

        <button onClick={() => navigate(-1)} className="converter-button">
          Go Back
        </button>
      </div>
    </Layout>
  );
};

export default OutputPage;
