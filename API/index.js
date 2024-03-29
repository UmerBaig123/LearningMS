var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");
const { ObjectId } = require("mongodb");
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

app.post("/api/Users/UpdateUser", multer().none(), (req, res) => {
  database.collection("UserData").updateOne(
    { userName: req.body.userName },
    {
      $set: {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        email: req.body.email,
        photoURL: req.body.photoURL,
      },
    },
    (error, result) => {
      res.send(result);
    }
  );
});
app.post("/api/Users/ChangePassword", multer().none(), (req, res) => {
  database.collection("Users").updateOne(
    { userName: req.body.userName },
    {
      $set: {
        password: req.body.newPassword,
      },
    },
    (error, result) => {
      res.send(result);
    }
  );
});
app.get("/api/Users/GetEmails", (req, res) => {
  database
    .collection("UserData")
    .find({})
    .toArray((error, result) => {
      res.send(result.map((x) => x.email));
    });
});
app.get("/api/Users/GetTasks", multer().none(), (req, res) => {
  database
    .collection("Tasks")
    .find({})
    .toArray((error, result) => {
      res.send(result);
    });
});
app.post("/api/Users/AddTasks", multer().none(), (req, res) => {
  database.collection("Tasks").insertOne(
    {
      user: req.body.user,
      name: req.body.name,
      category: req.body.category,
      deadline: req.body.deadline,
      description: req.body.description,
    },
    (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(result.result);
    }
  );
});
app.post("/api/Users/DeleteTask", multer().none(), (req, res) => {
  database
    .collection("Tasks")
    .deleteOne({ _id: ObjectId(req.query._id) }, (error, result) => {
      res.send(result);
    });
});
app.post("/api/Users/DeleteCourse", multer().none(), (req, res) => {
  database
    .collection("StudentCourses")
    .deleteOne({ _id: ObjectId(req.query._id) }, (error, result) => {
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
app.get("/api/Users/UserNames", multer().none(), (req, res) => {
  database
    .collection("Users")
    .find({})
    .toArray((error, result) => {
      res.send(result.map((x) => x.userName));
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
