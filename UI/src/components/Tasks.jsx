import { useState } from "react";
import "./tasks.css";

const Tasks = ({ task, keyName }) => {
  const [show, setShow] = useState(false);
  const deleteTask = () => {
    document.getElementById(task._id).style.height = "0%";
    document.getElementById(task._id).style.width = "0%";
    document.getElementById(task._id).style.opacity = 0;
  };
  return (
    <div
      onClick={() => {
        document.getElementById(task._id).style.height = show ? "7%" : "25%";
        if (show) {
          setShow(!show);
        } else {
          setTimeout(() => setShow(!show), 200);
        }
      }}
      id={task._id}
      className="taskContainer"
      key={task._id}
    >
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "25px",
          marginBottom: show && 20,
          pointerEvents: "all",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            flexDirection: "row",
            display: "flex",
          }}
        >
          <div
            style={{
              fontFamily: "Silkscreen",
              color: "#6e4620",
              marginLeft: 30,
            }}
          >
            Title :
          </div>{" "}
          &nbsp;
          {task.name}
        </div>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            marginRight: 30,
          }}
        >
          <div
            style={{
              fontFamily: "Silkscreen",
              color: "#6e4620",
            }}
          >
            Category :
          </div>{" "}
          &nbsp;
          {task.category}
        </div>
      </div>
      {show && (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "50%", marginLeft: 10 }}>{task.description}</div>
          <div style={{ flexDirection: "column", display: "flex" }}>
            {task.deadline}
            <img
              onClick={() => {
                console.log(task._id);
                fetch(
                  "http://localhost:3000/api/Users/DeleteTask?_id=" + task._id,
                  {
                    method: "POST",
                  }
                ).then(() => {
                  deleteTask();
                });
              }}
              className="delete"
              style={{
                pointerEvents: "all",
                transition: "all 0.2s ease",
              }}
              width="40"
              height="40"
              src="https://img.icons8.com/arcade/64/task-completed.png"
              alt="delete-forever"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
