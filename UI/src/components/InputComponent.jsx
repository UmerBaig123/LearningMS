import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./InputComponent.css";

const InputComponent = ({ type, placeholder, setval, hidden, focused }) => {
  const [isHidden, setIsHidden] = useState(hidden);
  const inputStyles = {
    padding: "10px",
    fontSize: "26px",
    border: "1px solid #ccc",
    fontFamily: "Pixelify Sans",
    fontWeight: "bold",
    borderRadius: "10px",
    outline: "none",
    width: hidden ? "342px" : "400px",
    marginBottom: "10px",
  };

  return (
    <div style={{ flexDirection: "row" }}>
      <input
        onFocus={focused}
        type={hidden ? (isHidden ? "password" : "text") : type}
        placeholder={placeholder}
        onChange={(e) => setval(e.target.value)}
        className="input"
        maxLength={16}
        style={inputStyles}
      />
      {hidden ? (
        isHidden ? (
          <FaEye
            size={30}
            className="button"
            onClick={() => {
              setIsHidden(!isHidden);
            }}
          />
        ) : (
          <FaEyeSlash
            size={30}
            className="button"
            onClick={() => {
              setIsHidden(!isHidden);
            }}
          />
        )
      ) : null}
    </div>
  );
};

export default InputComponent;
