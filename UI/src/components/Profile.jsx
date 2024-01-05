import { useEffect } from "react";
import "./Profile.css";

const Profile = ({ userData, setEdit }) => {
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
          src={userData.photoURL}
          style={{
            width: 60,
            height: 60,
            borderRadius: 20,
            border: "solid 5px black",
            marginRight: 30,
            cursor: "pointer",
            pointerEvents: "",
          }}
        />
        <div className="userName">{userData.name}</div>

        <img
          onClick={() => {
            setEdit(true);
          }}
          className="edit"
          src="https://img.icons8.com/cotton/64/create-new--v3.png"
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
        <div className="Data">{userData.userName}</div>
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
          style={{ color: userData.gender == "M" ? "blue" : "#ff0019" }}
          className="Data"
        >
          {userData.gender == "M" ? "Male" : "Female"}
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
        <div className="Data">{userData.email}</div>
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
        <div className="Data">{userData.age}</div>
      </div>
    </div>
  );
};

export default Profile;
