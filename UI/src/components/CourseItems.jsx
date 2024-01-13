import "./CourseItems.css";
const CourseItems = ({ course, className, idName, onClick, isAdmin }) => {
  return (
    <>
      <div
        id={idName}
        className={"courseItems " + className}
        onClick={() => {
          onClick(course._id);
        }}
      >
        <div className="name">
          <img
            width="50"
            height="50"
            src={course.photoURL}
            alt="minimum-value"
          />
          <div
            style={{
              fontSize:
                course.courseName.length > 8
                  ? (40 * 8) / course.courseName.length
                  : 40,
            }}
          >
            {course.courseName}
          </div>
        </div>
        <div className="ch">
          <div style={{ fontSize: 32 }}>Credit Hours :&nbsp;</div>{" "}
          {course.creditHours}
        </div>
      </div>
    </>
  );
};

export default CourseItems;
