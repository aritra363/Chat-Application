/* 
  Title : Database Connection
  Description : File to Connect to mongodb 
  Author : Aritra Pal
  Date : 14/12/2022 
*/

//dependencies
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

//db connection
const dbConnection = mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("Connection succesfull");
    } else {
      console.log(err.message);
    }
  }
);

//exporting
module.exports = dbConnection;
