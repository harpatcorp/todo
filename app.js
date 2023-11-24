require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const usercontroller = require("./controllers/userController");
const taskcontroller = require("./controllers/taskController");

const app = express();
const port = 3000;
app.use(bodyparser.json())

// mongo connection
mongoose.connect("mongodb://admin:admin@0.0.0.0:27017/",{
    "dbName":"todo"
});
const db = mongoose.connection;
db.once("open",()=>{
    console.log("Connected successfully")
});

// routes
app.post("/registerUser",usercontroller.registerUser);
app.post("/loginUser",usercontroller.loginUser);
app.get("/task",taskcontroller.readTask);
app.post("/task",taskcontroller.addTask);
app.patch("/task",taskcontroller.updateTask);
app.delete("/task",taskcontroller.deleteTask);


app.listen(port, () => {
    console.log("Server is started on port %s",(port))
});