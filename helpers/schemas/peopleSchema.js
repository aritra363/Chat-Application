/* 
  Title :  People's Schema
  Description : Schema of the people's collection
  Author : Aritra Pal
  Date : 20/12/2022 
*/

//dependencies
const mongoose = require("mongoose");

//creating people schema
const peopleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

//exporting the Schema
module.exports = peopleSchema;
