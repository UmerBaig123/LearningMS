import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useLocalStorage } from "./functions/useLocalStorage";
import "./EmailPage.css";
const EmailPage = ({ userData }) => {
  const [emailList, setEmailList] = useState([]);
  const form = useRef();
  const [emailHeight, setEmailHeight] = useLocalStorage("height", null);
  const [emailWidth, setEmailwidht] = useLocalStorage("width", null);
  const getEmails = () => {
    fetch("http://localhost:3000/api/Users/GetEmails").then((res) => {
      res.json().then((data) => {
        setEmailList(data);
      });
    });
  };
  const sendEmail = () => {};
  useEffect(() => {
    getEmails();
  }, []);
  return (
    <>
      <div className="success">Email sent successfully</div>
      <form
        ref={form}
        className="emailPage"
        onSubmit={(e) => {
          document.getElementsByClassName("success")[0].style.opacity = 1;
          e.preventDefault();
          emailjs.sendForm(
            //service id,
            //template id,
            form.current
            //PUBLIC USER ID
          );
          form.current.reset();
          setTimeout(() => {
            document.getElementsByClassName("success")[0].style.opacity = 0;
          }, 1000);
        }}
      >
        <div style={{ flexDirection: "row", display: "flex", gap: 15 }}>
          <datalist id="emailList">
            {emailList.map((email) => {
              return (
                <option key={email} value={email}>
                  {email}
                </option>
              );
            })}
          </datalist>

          <input
            name="to_email"
            list="emailList"
            type="text"
            placeholder="TO:"
            className="emailInp"
          />

          <input
            type="text"
            name="to_name"
            placeholder="Name:"
            className="emailInp"
          />
        </div>
        <input value={userData.name} name="from_name" hidden={true} />
        <input
          type="text"
          name="header"
          placeholder="Header"
          className="emailInp"
        />
        <textarea
          name="message"
          style={{
            height: emailHeight ? emailHeight : "40%",
            width: emailWidth ? emailWidth : "100%",
          }}
          onClick={(e) => {
            setEmailHeight(e.target.style.height);
            setEmailwidht(e.target.style.width);
          }}
          className="emailTextArea"
          placeholder="Write your email here..."
        ></textarea>
        <button onClick={sendEmail} name="submit" className="emailBtn">
          Send
        </button>
      </form>
    </>
  );
};

export default EmailPage;
