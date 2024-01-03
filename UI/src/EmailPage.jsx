import { useState } from "react";
import { useLocalStorage } from "./functions/useLocalStorage";
import "./EmailPage.css";

const EmailPage = ({ userData }) => {
  const [emailHeight, setEmailHeight] = useLocalStorage("height", null);
  const [emailWidth, setEmailwidht] = useLocalStorage("width", null);
  return (
    <div className="emailPage">
      <textarea
        style={{
          height: emailHeight ? emailHeight : "40%",
          width: emailWidth ? emailWidth : "80%",
        }}
        onClick={(e) => {
          setEmailHeight(e.target.style.height);
          setEmailwidht(e.target.style.width);
        }}
        className="emailTextArea"
        placeholder="Write your email here..."
      ></textarea>
    </div>
  );
};

export default EmailPage;
