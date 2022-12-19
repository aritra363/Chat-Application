/* 
  Title : App
  Description : Main entry point of the Chat Application 
  Author : Aritra Pal
  Date : 14/12/2022 
*/

//external dependencies
const express = require("express");
const dotenv = require("dotenv").config();
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const path = require("path")

//internal dependencies
const loginRouter = require("./routeHandler/loginRouter")
const usersRouter = require("./routeHandler/usersRouter")
const inboxRouter = require("./routeHandler/inboxRouter")

//helper function dependencies
const dbConnection = require("./helpers/dbConnection");
const {
  notFoundHandler,
  commonErrorHandler,
} = require("./middlewares/common/errorHandler");

//Initialize App Object
const app = express();

//Database Connection
dbConnection;

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

//setting public path
app.use(express.static(path.join(__dirname,"public")))

//cookie parser middleware
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use("/",loginRouter) //for index or loginpage main page
app.use("/users",usersRouter) //for index or loginpage main page
app.use("/inbox",inboxRouter) //for index or loginpage main page

//404 error handling
app.use(notFoundHandler)

//common error handler
app.use(commonErrorHandler)

//Start the Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
