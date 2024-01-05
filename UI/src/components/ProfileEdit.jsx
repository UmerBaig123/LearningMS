import { useEffect, useState } from "react";
import "./Profile.css";
import "./ProfileEdit.css";

const ProfileEdit = ({ userData, setEdit, refresh }) => {
  const [gender, setGender] = useState(userData.gender);
  const [photoUrl, setPhotoUrl] = useState(userData.photoURL);
  const [urlShow, setUrlShow] = useState(false);
  const setDataBase = () => {
    const data = new FormData();
    data.append("name", document.getElementById("name").textContent);
    data.append("userName", userData.userName);
    data.append("email", document.getElementById("email").textContent);
    data.append("gender", gender);
    data.append("age", document.getElementById("age").textContent);
    data.append("photoURL", photoUrl);
    const options = {
      method: "POST",
      body: data,
    };
    fetch("http://localhost:3000/api/Users/UpdateUser", options).then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          refresh();
        });
      }
    );
  };

  return (
    <div
      className="profileContainer"
      style={{
        width: "97%",
        height: "87%",
        flexDirection: "column",
        alignItems: "center",
        display: "flex",
      }}
    >
      {urlShow && (
        <div className="photoURL">
          Enter Photo URL
          <div style={{ flexDirection: "row", display: "flex" }}>
            <input
              style={{
                borderRadius: 5,
                boxShadow: "inset 0px 0px 5px 2px rgba(0,0,0,0.75)",
                outline: "none",
              }}
              className="photoURLInput"
              onChange={(e) => {
                setPhotoUrl(e.target.value);
              }}
            />
            <img
              width={30}
              height={30}
              src="https://img.icons8.com/color/48/000000/checked--v1.png"
              onClick={() => {
                setUrlShow(!urlShow);
              }}
              style={{ cursor: "pointer", pointerEvents: "fill" }}
            />
          </div>
        </div>
      )}
      <div className="message">Content is now editable</div>
      <div
        style={{
          width: "100%",
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 30,
        }}
      >
        <img
          src={photoUrl || userData.photoURL}
          onClick={() => {
            setUrlShow(!urlShow);
          }}
          className="profilePhoto"
          style={{
            width: 60,
            height: 60,
            borderRadius: 20,
            border: "solid 5px black",
            marginRight: 30,
            cursor: "pointer",
            pointerEvents: "fill",
          }}
        />
        <div
          id="name"
          className="userName editBorder"
          contentEditable={true}
          style={{ pointerEvents: "fill" }}
        >
          {userData.name}
        </div>
        <img
          onClick={() => {
            setDataBase();
            setEdit(false);
          }}
          className="edit"
          src="https://img.icons8.com/color/96/checked-checkbox.png"
          alt="edit"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "95%",
          marginLeft: "5%",
        }}
      >
        <div className="title">User Name:</div>
        <div className="Data " id="userName">
          {userData.userName}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "95%",
          marginLeft: "5%",
        }}
      >
        <div className="title">Gender:</div>
        <div
          id="gender"
          onClick={() => {
            setGender("F");
          }}
          style={{
            pointerEvents: "fill",
            cursor: "pointer",
            color: "#ff0019",
            padding: "0px 10px",
            border: "solid 2px black",
            backgroundColor: gender == "F" ? "#fc79a1" : "rgba(0, 0, 0, 0.1)",
            borderRadius: 10,
          }}
          className="Data"
        >
          Female
        </div>
        <div
          id="gender"
          onClick={() => {
            setGender("M");
          }}
          style={{
            pointerEvents: "fill",
            cursor: "pointer",
            color: "blue",
            padding: "0px 10px",
            border: "solid 2px black",
            backgroundColor: gender == "M" ? "#79a9fc" : "rgba(0, 0, 0, 0.1)",
            borderRadius: 10,
          }}
          className="Data"
        >
          Male
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "95%",
          marginLeft: "5%",
        }}
      >
        <div className="title">Email:</div>
        <div
          id="email"
          className="Data editBorder"
          style={{
            pointerEvents: "fill",
          }}
          contentEditable={true}
        >
          {userData.email}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "95%",
          marginLeft: "5%",
        }}
      >
        <div className="title">Age:</div>
        <div
          className="Data editBorder"
          id="age"
          style={{
            pointerEvents: "fill",
          }}
          contentEditable={true}
        >
          {userData.age}
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
