import { useEffect } from "react";
import "./ProfilePage.css";

const ProfilePage = ({ userData }) => {
  return (
    <div
      className="profileContainer"
      style={{
        width: "100%",
        height: "100%",
        opacity: 0,
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
            width: 70,
            height: 70,
            borderRadius: 20,
            border: "solid 5px black",
            marginRight: 30,
          }}
        />
        <div className="userName">{userData.name}</div>

        <img
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
          style={{ color: userData.gender == "M" ? "blue" : "pink" }}
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

export default ProfilePage;
