const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users.js");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/crud")
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.get("/getUser/:id", (req, res) => {
  const _id = req.params.id;
  UserModel.findById({ _id })
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.put("/updateUser/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id:id})
  .then(res=>res.json(res))
  .catch(err => res.json(err))
})

app.listen(3000, () => {
  console.log("server running on port 3000");
});
