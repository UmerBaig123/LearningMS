import Tasks from "./components/Tasks";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import "./TaskPage.css";
const TaskPage = ({ userData }) => {
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState(userData.userName);
  const [show, setShow] = useState(false);
  const [fData, setFormData] = useState({});
  const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    console.log(e.target.type);
    setFormData({
      ...fData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    handleClose();
    e.preventDefault();
    const data = new FormData();
    data.append("user", userName);
    data.append("name", fData.name);
    data.append("category", fData.category);
    data.append("description", fData.description);
    data.append("deadline", fData.deadline);
    fetch("http://localhost:3000/api/Users/AddTasks", {
      method: "POST",
      body: data,
    }).then((response) => {
      getTasks();
    });
  };
  const handleClose = () => {
    setFormData({});
    setShow(false);
  };
  const getTasks = () => {
    fetch(
      "http://localhost:3000/api/Users/GetTasks?user=" + userData.userName
    ).then((response) => {
      response.json().then((data) => {
        setTasks(data);
      });
    });
  };
  const getUsers = () => {
    fetch("http://localhost:3000/api/Users/UserNames").then((response) => {
      response.json().then((data) => {
        setUsers(data);
      });
    });
  };
  useEffect(() => {
    getTasks();
    getUsers();
  }, []);
  return (
    <>
      <div className="taskPage">
        {tasks.map((task) => {
          if (task.user == userData.userName) {
            return <Tasks key={task._id} userData={userData} task={task} />;
          }
        })}
      </div>
      <img
        onClick={() => setShow(true)}
        src="/pixelPlus.png"
        className="pixelPlus"
        alt="PixelPlus"
      />
      <ReactModal
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={true}
        isOpen={show}
        className="taskModal"
      >
        <img
          className="closeButton"
          onClick={() => setShow(false)}
          src="/Close.png"
          alt="close"
        />
        <div style={{ fontFamily: "Silkscreen", fontSize: 40 }}>Add Task</div>
        <div className="formContainer">
          <select
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            style={{
              height: 40,
            }}
            defaultValue={userData.userName}
            className="taskInp"
            name="To"
            id="userNames"
          >
            {users.map((user) => {
              return (
                <option className="listItems" value={user}>
                  {user}
                </option>
              );
            })}
          </select>
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
            <div style={{ flexDirection: "row", display: "flex" }}>
              <input
                className="taskInp"
                name="name"
                placeholder="Name"
                value={fData.name}
                onChange={handleChange}
              />
              <input
                className="taskInp"
                name="category"
                placeholder="Category"
                value={fData.category}
                onChange={handleChange}
              />
            </div>
            <textarea
              className="textArea"
              name="description"
              placeholder="Description"
              value={fData.photoURL}
              onChange={handleChange}
            />
            <div style={{ flexDirection: "row", display: "flex" }}>
              <input
                className="taskInp"
                type="date"
                name="deadline"
                placeholder="deadline"
                value={fData.dueDate}
                onChange={handleChange}
              />
            </div>
            <button className="submitbtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </ReactModal>
    </>
  );
};

export default TaskPage;
