import React from "react";
import { useState, useEffect } from "react";
import { useLocalStorage } from "./functions/useLocalStorage";
import { FaBars } from "react-icons/fa";
import DropItem from "./components/DropItem";
import EmailPage from "./EmailPage";
import CoursesPage from "./CoursesPage";
import TabsItem from "./components/tabsItem";
import ReactModal from "react-modal";
import "./Homepage.css";
import ProfilePage from "./ProfilePage";
function Homepage() {
  const [show, setShow] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useLocalStorage("user", "");
  const [userData, setUserData] = useState({});
  const [menu, setMenu] = useState(true);
  const [currentPage, setCurrentPage] = useLocalStorage("page", "");
  const authenticate = () => {
    const data = new FormData();
    data.append("name", userData.userName);
    data.append("password", oldPass);
    data.append("newPassword", newPass);
    const options = {
      method: "POST",
      body: data,
    };
    const data2 = new FormData();
    data2.append("userName", userData.userName);
    data2.append("newPassword", newPass);
    fetch("http://localhost:3000/api/Users/Auth", options)
      .then((response) => {
        response.json().then((data) => {
          if (!data) {
            setError("Incorrect Password");
          } else {
            setShow(false);
            fetch("http://localhost:3000/api/Users/ChangePassword", {
              method: "POST",
              body: data2,
            }).then((response) => {
              response.json().then((data) => {
                console.log(data);
              });
            });
          }
        });
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  function openMenu() {
    if (menu) {
      setMenu(false);
      let element = document.getElementsByClassName("menuItems")[0];
      document.getElementById("dropItem").style.opacity = 0;
      element.style.height = "0px";
      let currentHeight = 0;
      let targetHeight = 187; // Set the desired target height here
      let increment = 25; // Set the increment value here

      let interval = setInterval(() => {
        if (currentHeight < targetHeight) {
          currentHeight += increment;
          element.style.height = currentHeight + "px";
        } else {
          clearInterval(interval);
          document.getElementById("dropItem").style.opacity = 1;
          document.getElementById("dropItem1").style.height = "50px";
          document.getElementById("dropItem2").style.height = "50px";
          document.getElementById("dropItem3").style.height = "50px";
          setTimeout(() => {
            document.getElementById("dropItem1").style.height = "45px";
            document.getElementById("dropItem2").style.height = "45px";
            document.getElementById("dropItem3").style.height = "45px";
          }, 100);
        }
      }, 15); // Interval of 0.2 seconds (200 milliseconds)
    }
    if (!menu) {
      document.getElementById("dropItem").style.opacity = 0;
      let element = document.getElementsByClassName("menuItems")[0];
      element.style.height = "187px";
      let currentHeight = 187;
      let targetHeight = 0; // Set the desired target height here
      let increment = 5; // Set the increment value here

      let interval = setInterval(() => {
        if (currentHeight > targetHeight) {
          currentHeight -= increment;
          element.style.height = currentHeight + "px";
        } else {
          clearInterval(interval);
          setMenu(true);
        }
      }, 10);
    }
  }
  const getUserData = () => {
    fetch("http://localhost:3000/api/Users/Users?userName=" + user).then(
      (response) => {
        response.json().then((data) => {
          setUserData(data[0]);
        });
      }
    );
  };
  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    } else {
      getUserData();
    }
  }, [user]);
  return (
    <>
      <div>
        <div className="topBar">
          <div
            className="user"
            onClick={() => {
              setCurrentPage("Profile");
            }}
            style={{
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
              backgroundColor:
                userData.type == "admin"
                  ? "rgba(229, 181, 0, 0.3)"
                  : "rgba(124, 73, 73, 0.3)",
            }}
          >
            <img
              src={userData.photoURL}
              style={{
                marginLeft: 10,
                marginRight: 10,
                width: 30,
                height: 30 * 0.95,
                borderRadius: "40%",
                border: "2px solid  black",
                boxShadow: "0px 0px 10px 0px black",
              }}
            />
            {userData.name}
          </div>
          <div className="leftMenu">
            <div className="menuItems" hidden={menu}>
              <div id="dropItem">
                <DropItem
                  bar={true}
                  idName={"dropItem1"}
                  icon={"https://img.icons8.com/dotty/80/language.png"}
                  style={{
                    fontSize: 13,
                    paddingTop: 11,
                    paddingBottom: 11,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                  title={"Language"}
                  onClick={() => {
                    alert("Saanu wi ptaa tenu hor koi language ni aundi ");
                  }}
                />
                <DropItem
                  bar={true}
                  idName={"dropItem2"}
                  icon={"https://img.icons8.com/ios-filled/100/key.png"}
                  style={{
                    fontSize: 13,
                    paddingTop: 11,
                    paddingBottom: 11,
                  }}
                  title={"Change Password"}
                  onClick={() => {
                    setMenu(true);
                    setShow(true);
                  }}
                />
                <DropItem
                  bar={false}
                  idName={"dropItem3"}
                  icon={"https://img.icons8.com/ios/50/exit--v1.png"}
                  style={{
                    fontSize: 13,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    paddingTop: 11,
                    paddingBottom: 11,
                  }}
                  title={"Logout"}
                  onClick={() => {
                    setUser("");
                  }}
                />
              </div>
            </div>
            <FaBars
              onClick={() => {
                openMenu();
              }}
              className="menu"
            />
          </div>
        </div>
        {/*TopBar End */}
        <div
          className="bottom"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "95%",
            height: "0vh",
            alignItems: "center",
          }}
        >
          <div
            className="tabsContainer"
            style={{
              backgroundColor:
                userData.type == "admin" ? "#5b6a7d" : "rgba(96, 176, 105, 1)",
            }}
          >
            <TabsItem
              selected={currentPage == "Profile"}
              title={"Profile"}
              onClick={() => {
                setCurrentPage("Profile");
              }}
              icon={
                userData.gender == "M"
                  ? "https://img.icons8.com/color/96/circled-user-male-skin-type-4--v1.png"
                  : "https://img.icons8.com/color/96/circled-user-female-skin-type-4--v1.png"
              }
            />
            <TabsItem
              selected={currentPage == "Courses"}
              title={"Courses"}
              onClick={() => {
                setCurrentPage("Courses");
              }}
              icon={
                "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-courses-recruitment-agency-flaticons-lineal-color-flat-icons.png"
              }
            />
            <TabsItem
              selected={currentPage == "Tasks"}
              title={"Tasks"}
              onClick={() => {
                setCurrentPage("Tasks");
              }}
              icon={
                "https://img.icons8.com/external-vectorslab-flat-vectorslab/53/external-tasks-project-management-and-web-marketing-vectorslab-flat-vectorslab.png"
              }
            />
            <TabsItem
              selected={currentPage == "Email"}
              title={"Email"}
              onClick={() => {
                setCurrentPage("Email");
              }}
              icon={
                "https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/external-mail-mail-vitaliy-gorbachev-blue-vitaly-gorbachev-9.png"
              }
            />
          </div>
          <div
            className="contentContainer"
            style={{
              backgroundColor:
                userData.type == "admin" ? "#91a8c7" : "rgba(96, 176, 105, 1)",
            }}
          >
            {currentPage == "Profile" && (
              <ProfilePage userData={userData} refresh={getUserData} />
            )}
            {currentPage == "Courses" && <CoursesPage userData={userData} />}
            {currentPage == "Email" && <EmailPage userData={userData} />}
          </div>
        </div>
        <ReactModal
          onRequestClose={() => {
            setShow(false);
          }}
          shouldCloseOnOverlayClick={true}
          isOpen={show}
          className="passModal"
        >
          <input
            type="text"
            placeholder="Old Password"
            className="passInp"
            onChange={(e) => {
              setOldPass(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="New Password"
            className="passInp"
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
          />
          <div className="errorMsg">{error ? error : <>&nbsp;</>}</div>
          <button
            className="submit"
            onClick={() => {
              authenticate();
            }}
          >
            Submit
          </button>
        </ReactModal>
      </div>
    </>
  );
}

export default Homepage;
