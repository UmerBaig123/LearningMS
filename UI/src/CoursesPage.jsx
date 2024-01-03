import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import CourseItems from "./components/CourseItems";
import "./CoursesPage.css";

const CoursesPage = ({ userData }) => {
  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);
  const [fData, setFormData] = useState({});
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/Users/Courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...fData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    console.log(formData);
  };

  return (
    <div className="coursesPage">
      {courses.map((course) => {
        return <CourseItems course={course} />;
      })}

      {userData.type === "admin" && (
        <>
          <img
            onClick={() => handleShow()}
            src="/pixelPlus.png"
            alt="add"
            className="addButton"
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
