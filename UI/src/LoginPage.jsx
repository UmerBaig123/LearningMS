import { useEffect, useState, Component } from "react";
import InputComponent from "./components/InputComponent.jsx";
import typeQuote from "./functions/typeQuote.js";
import { useLocalStorage } from "./functions/useLocalStorage.js";
import "./LoginPage.css";

function LoginPage() {
  const [user, setUser] = useLocalStorage("user", "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [focused, setFocused] = useState(false);
  const authenticate = () => {
    const data = new FormData();
    data.append("name", username);
    data.append("password", password);
    const options = {
      method: "POST",
      body: data,
    };

    fetch("http://localhost:3000/api/Users/Auth", options)
      .then((response) => {
        response.json().then((data) => {
          setIsError(!data);
          if (data) {
            setUser(username);
            window.location.href = "/home";
          } else {
            setErrorMessage("Incorrect username or password");
          }
        });
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  useEffect(() => {
    if (user) {
      window.location.href = "/home";
    }
  }, []);
  useEffect(() => {
    if (focused) {
      document.getElementById("bookPic").style.opacity = 1;
      typeQuote("Hi, " + username + "!", ".quote", 200);
      typeQuote("Welcome to the learning management system", ".welcome", 80);
    }
  }, [focused]);
  return (
    <>
      <div className="page">
        <div className="leftSide">
          <div className="white-circle">
            <img
              src="/books.png"
              id="bookPic"
              className="bookPic"
              style={{ width: 100, height: 100 }}
            />
          </div>
          <div className="quote"></div>
          <div className="welcome"></div>
        </div>
        <div className="loginBox">
          <img src="/icon.png" className="icon" />
          <h1>SIGN IN</h1>
          <div className="inputContainer">
            <InputComponent
              type="text"
              placeholder="Username"
              setval={setUsername}
              hidden={false}
            />
            <InputComponent
              type="text"
              placeholder="Password"
              setval={setPassword}
              focused={() => {
                if (!focused) {
                  setFocused(true);
                }
              }}
              hidden={true}
            />
            <div
              className="errorMessage"
              style={{ color: isError ? "#ff0000" : "#05fa2e" }}
            >
              {errorMessage ? errorMessage : <>&nbsp;</>}
            </div>
          </div>
          <button
            className="loginButton"
            style={{ fontFamily: "Silkscreen" }}
            onClick={() => {
              authenticate();
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
