require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require("./utils/swagger_options");
const jwtVarification = require("./utils/user_varification");
const usercontroller = require("./controllers/userController");
const taskcontroller = require("./controllers/taskController");

const app = express();
const port = process.env.PORT;

app.use(bodyparser.json());

// mongo connection
mongoose.connect("mongodb://"+
            process.env.DB_USER+
            ":"+
            process.env.DB_PASS+
            "@"+process.env.DB_HOST+":"+
            process.env.DB_PORT+
            "/", 
            {
    "dbName": process.env.DB_NAME
});
const db = mongoose.connection;
db.once("open", () => {
    console.log("Connected successfully")
});

// Swagger setup
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.post("/registerUser", usercontroller.registerUser);
app.post("/loginUser", usercontroller.loginUser);
app.get("/task", jwtVarification, taskcontroller.readTask);
app.post("/task", jwtVarification, taskcontroller.addTask);
app.put("/task?:task_id", jwtVarification, taskcontroller.updateTask);
app.delete("/task?:task_id", jwtVarification, taskcontroller.deleteTask);


app.listen(port, () => {
    console.log("Server is started on port %s", (port))
});