import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import CourseItems from "./components/CourseItems";
import "./CoursesPage.css";

const CoursesPage = ({ userData }) => {
  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);
  const [fData, setFormData] = useState({});
  const [deletemode, setDeleteMode] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const getCourses = () => {
    fetch("http://localhost:3000/api/Users/Courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  };
  useEffect(() => {
    getCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...fData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setShow(false);
    const data = new FormData();
    data.append("courseName", fData.courseName);
    data.append("creditHours", fData.creditHours);
    data.append("photoURL", fData.photoURL);
    const options = {
      method: "POST",
      body: data,
    };
    fetch("http://localhost:3000/api/Users/AddCourse", options).then((res) => {
      setFormData({});
      getCourses();
    });
  };

  const handleDelete = (id) => {
    document.getElementById(id).style.width = "0px";
    document.getElementById(id).style.height = "0px";
    document.getElementById(id).style.opacity = 0;
    fetch(`http://localhost:3000/api/Users/DeleteCourse?_id=` + id, {
      method: "POST",
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="coursesPage">
      {courses.map((course) => {
        return (
          <CourseItems
            isAdmin={userData.type === "admin"}
            idName={course._id}
            onClick={deletemode && handleDelete}
            key={course._id}
            course={course}
            className={deletemode && "shake"}
          />
        );
      })}

      {userData.type === "admin" && (
        <>
          <img
            onClick={() => handleShow()}
            src="/pixelPlus.png"
            alt="add"
            className="addButton"
          />
          <img
            onClick={() => setDeleteMode(!deletemode)}
            src={
              deletemode
                ? "https://img.icons8.com/color/96/checked-2--v1.png"
                : "/Delete.png"
            }
            alt="add"
            className="deleteButton"
          />
          <ReactModal
            onRequestClose={handleClose}
            shouldCloseOnOverlayClick={true}
            isOpen={show}
            className="modal"
          >
            <img
              className="closeButton"
              onClick={() => setShow(false)}
              src="/Close.png"
              alt="close"
            />
            <div style={{ fontFamily: "Silkscreen", fontSize: 40 }}>
              Add Course
            </div>
            <div className="formContainer">
              <form
                onSubmit={handleSubmit}
                style={{
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <input
                  className="modalInput"
                  name="courseName"
                  placeholder="Name"
                  value={fData.name}
                  onChange={handleChange}
                />
                <input
                  className="modalInput"
                  name="creditHours"
                  placeholder="Credit Hours"
                  value={fData.creditHours}
                  onChange={handleChange}
                />
                <input
                  className="modalInput"
                  name="photoURL"
                  placeholder="photo URL"
                  value={fData.photoURL}
                  onChange={handleChange}
                />
                <button className="submitbtn" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </ReactModal>
        </>
      )}
    </div>
  );
};

export default CoursesPage;
