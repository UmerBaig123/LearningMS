import { useEffect, useState } from "react";
import CourseItems from "./components/CourseItems";
import "./CoursesPage.css";

const CoursesPage = ({ userData }) => {
  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleClose = () => setShow(false);
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
      ...formData,
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
          {/* <div hidden={true} className="modal">
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                name="CreditHours"
                placeholder="Credit Hours"
                value={formData.creditHours}
                onChange={handleChange}
              />
              <input
                name="photoUrl"
                placeholder="photo URL"
                value={formData.photoURL}
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div> */}
        </>
      )}
    </div>
  );
};

export default CoursesPage;
