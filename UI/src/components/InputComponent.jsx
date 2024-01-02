import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./InputComponent.css";

const InputComponent = ({ type, placeholder, setval, hidden, focused }) => {
  const [isHidden, setIsHidden] = useState(hidden);
  const inputStyles = {
    fontSize: "30px",
    border: "0px solid #ccc",
    fontFamily: "Pixelify Sans",
    fontWeight: "bold",
    width: hidden ? "342px" : "400px",
  };

  return (
    <div style={{ flexDirection: "row", margin: 15 }}>
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
