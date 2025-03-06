import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { masuToBaForm } from "../logic/baform";
import { masuToToForm } from "../logic/toform";
import { masuToTaiForm} from "../logic/taiform";
import { masuToTaraForm } from "../logic/taraform";
import { toVolitionalForm } from "../logic/volitionalform";
import { toPassiveForm } from "../logic/passiveform";
import "./Converter.css"; // Import styling

const N4Converter = ({ title }) => {
  const [inputText, setInputText] = useState("");
  const [selectedForm, setSelectedForm] = useState("");
  const navigate = useNavigate();

  const handleConvert = () => {
    if (!inputText || !selectedForm) {
      alert("Please enter text and select a form.");
      return;
    }

    let convertedText = "";
      if (selectedForm === "Ba Form") {
        convertedText = masuToBaForm(inputText);
      }
      else if (selectedForm === "To Form") {
        convertedText = masuToToForm(inputText);
      }
      else if (selectedForm === "Tai Form") {
        convertedText = masuToTaiForm(inputText);
      }
      else if (selectedForm === "Tara Form") {
        convertedText = masuToTaraForm(inputText);
      }
      else if (selectedForm === "Volitional Form") {
        convertedText = toVolitionalForm(inputText);
      }
      else if (selectedForm === "Passive Form") {
        convertedText = toPassiveForm(inputText);
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
        <option value="Ba Form">Ba Form</option>
        <option value="Tara Form">Tara Form</option>
        <option value="To Form">To Form</option>
        <option value="Volitional Form">Volitional Form</option>
        <option value="Tai Form">Tai Form</option>
        <option value="Passive Form">Passive Form</option>
      </select>
      <button onClick={handleConvert} className="converter-button">
        Convert
      </button>
      <p className="note-text">*Note: Make sure to leave a space between verb and shimasu*</p>
    </div>
  );
};

export default N4Converter;
