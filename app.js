/* 
  Title : App
  Description : Main entry point of the Chat Application 
  Author : Aritra Pal
  Date : 14/12/2022 
*/

//dependencies
const express = require("express");
const dotenv = require("dotenv").config();
const ejs = require("ejs")
const cookieParser = require("cookie-parser");

//helper function dependencies
const dbConnection = require("./helpers/dbConnection");

//Initialize App Object
const app = express();

//Database Connection
dbConnection;

//request parsers
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//set view engine
app.set('view engine','ejs')

//cookie parser middleware
app.use(cookieParser(process.env.COOKIE_SECRET))

//routing setup

//error handling


//Start the Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
