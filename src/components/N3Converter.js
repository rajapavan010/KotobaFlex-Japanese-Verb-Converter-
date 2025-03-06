import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toCausativeForm } from "../logic/causativeform";
import { masuToPotentialForm } from "../logic/potentialform";
import { toCausativePassiveForm } from "../logic/causativepassiveform"
import { masuToImperativeForm } from "../logic/imperativeform";
import { masuToYouniForm } from "../logic/youniform";
import { masuToProhibitiveForm } from "../logic/prohibitiveform";

import "./Converter.css"; // Import styling

const N3Converter = ({ title }) => {
  const [inputText, setInputText] = useState("");
  const [selectedForm, setSelectedForm] = useState("");
  const navigate = useNavigate();

  const handleConvert = () => {
    if (!inputText || !selectedForm) {
      alert("Please enter text and select a form.");
      return;
    }

    let convertedText = "";
      if (selectedForm === "Causative Form") {
        convertedText = toCausativeForm(inputText);
      }
      else if (selectedForm === "Potential Form") {
        convertedText = masuToPotentialForm(inputText);
      }
      else if(selectedForm === "Causative Passive Form") {
        convertedText = toCausativePassiveForm(inputText);
      }
      else if(selectedForm === "Imperative Form") {
        convertedText = masuToImperativeForm(inputText);
      }
      else if(selectedForm === "Youni Form") {
        convertedText = masuToYouniForm(inputText);
      }
      else if(selectedForm === "Prohibitive Form") {
        convertedText = masuToProhibitiveForm(inputText);
      }
      else {
        convertedText = `Conversion for ${selectedForm} not implemented yet.`;
      }

    // Navigate to OutputPage with state
    navigate("/output", {
      state: {
        originalText: inputText,
        convertedText: convertedText,
      },
    });
  };

  return (
    <div className="converter-container">
      <h2>{title}</h2>
      <input
        type="text"
        placeholder="Enter Text (Polite Form)"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="converter-input"
      />
      <select
        value={selectedForm}
        onChange={(e) => setSelectedForm(e.target.value)}
        className="converter-select"
      >
        <option value="">Select Form</option>
        <option value="Causative Form">Causative Form</option>
        <option value="Causative Passive Form">Causative Passive Form</option>
        <option value="Potential Form">Potential Form</option>
        <option value="Imperative Form">Imperative Form</option>
        <option value="Prohibitive Form">Prohibitive Form</option>
        <option value="Youni Form">Youni Form</option>
      </select>
      <button onClick={handleConvert} className="converter-button">
        Convert
      </button>
      <p className="note-text">Note: Make sure to leave a space between verb and shimasu</p>
    </div>
  );
};

export default N3Converter;