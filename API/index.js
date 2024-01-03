var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");
require("dotenv").config();

var app = Express();
app.use(cors());

var CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
var DATABASE_NAME = "Users";
var database;

app.listen(3000, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASE_NAME);
  });
});

app.get("/api/Users/Users", multer().none(), (req, res) => {
  database
    .collection("UserData")
    .find({})
    .toArray((error, result) => {
      res.send(result.filter((x) => x.userName == req.query.userName));
    });
});

app.get("/api/Users/Courses", (req, res) => {
  database
    .collection("StudentCourses")
    .find({})
    .toArray((error, result) => {
      res.send(result);
    });
});

app.post("/api/Users/AddCourse", multer().none(), (req, res) => {
  database.collection("StudentCourses").count({}, function (err, numOfDocs) {
    database.collection("StudentCourses").insertOne(
      {
        id: numOfDocs + 1,
        courseName: req.body.courseName,
        creditHours: req.body.creditHours,
        photoURL: req.body.photoURL,
      },
      (error, result) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.send(result.result);
      }
    );
  });
});
app.post("/api/Users/Auth", multer().none(), (req, res) => {
  database
    .collection("Users")
    .find({})
    .toArray((error, result) => {
      let auth = false;
      result.forEach((element) => {
        if (
          element.userName == req.body.name &&
          element.password == req.body.password
        ) {
          auth = true;
        }
      });
      res.send(auth);
    });
});

app.post("/api/Users/AddUser", multer().none(), (req, res) => {
  database.collection("Users").count({}, function (err, numOfDocs) {
    database.collection("Users").insertOne(
      {
        id: numOfDocs + 1,
        name: req.body.name,
        password: req.body.password,
        age: req.body.age,
        email: req.body.email,
        type: "user",
      },
      (error, result) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.send("result.result");
      }
    );
  });
});
