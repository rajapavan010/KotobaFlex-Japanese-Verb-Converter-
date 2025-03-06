import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { masuToDictionary } from "../logic/Dict";
import { masuToTeForm } from "../logic/teform";
import { masuToTaForm } from "../logic/taform";
import { masuToNaiForm } from "../logic/naiform";

import "./Converter.css";

const N5Converter = ({ title }) => {
  const [inputText, setInputText] = useState("");
  const [selectedForm, setSelectedForm] = useState("");
  const navigate = useNavigate();


  const handleConvert = () => {
    if (!inputText || !selectedForm) {
      alert("Please enter text and select a form.");
      return;
    }

    let convertedText = "";
    if (selectedForm === "Dictionary Form") {
      convertedText = masuToDictionary(inputText);
    }
    else if (selectedForm === "Te Form") {
      convertedText = masuToTeForm(inputText);
    }
    else if (selectedForm === "Ta Form") {
      convertedText = masuToTaForm(inputText);
    }
    else if (selectedForm === "Nai Form") {
      convertedText = masuToNaiForm(inputText);
    }
    else {
      convertedText = `Conversion for ${selectedForm} not implemented yet.`;
    }

    navigate("/output", {
      state: { originalText: inputText, convertedText: convertedText },
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
        <option value="Dictionary Form">Dictionary</option>
        <option value="Te Form">Te Form</option>
        <option value="Ta Form">Ta Form</option>
        <option value="Nai Form">Nai Form</option>
      </select>
      <button onClick={handleConvert} className="converter-button">
        Convert
      </button>
      <p className="note-text">*Note: Make sure to leave a space between verb and shimasu*</p>  
    </div>
  );
};

export default N5Converter; 