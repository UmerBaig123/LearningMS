import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./LoginPage.jsx";
import Homepage from "./HomePage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Homepage />} />
    </Routes>
  </BrowserRouter>
);
