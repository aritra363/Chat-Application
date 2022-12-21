/* 
  Title : Users Controller
  Description : Deals with all the middleware required for the Users route
  Author : Aritra Pal
  Date : 19/12/2022 
*/
//dependencies
const bcrypt = require("bcrypt");
const peopleModel = require("../helpers/models/peopleModel");
const { unlink } = require("fs");
const path = require("path");

//getUsers function (render the index page)
const getUsers = async (req, res, next) => {
  //get user's from database
  try {
    const userData = await peopleModel.find({});
    res.render("users", {
      Udata: userData,
    });
  } catch (err) {
    next(err);
  }
};

//add user to database
const addUser = async (req, res, next) => {
  let newUser;
  //hash the user's password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //check if there is a file upload
  if (req.files && req.files.length > 0) {
    //make newuser with avatar name
    newUser = {
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    };
  } else {
    //make new user without avatar name
    newUser = {
      ...req.body,
      avatar: "demouser.png",
      password: hashedPassword,
    };
  }
  //save to database
  try {
    const newpeopleModel = new peopleModel(newUser);
    const result = await newpeopleModel.save();
    res.status(200).send({
      message: "User added Successfully",
    });
  } catch (err) {
    res.status(500).send({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

//remove user from db
const removeUser = async (req, res, next) => {
  try {
    const user = await peopleModel.findByIdAndDelete({
      _id: req.params.id,
    });

    //remove user avatar
    if (user.avatar !== "demouser.png") {
      unlink(
        path.join(__dirname, "../public/uploads/avatars/", user.avatar),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    //send response
    res.status(200).send({
      message: "User Delete Successfully",
    });
  } catch (err) {
    res.status(500).send({
      errors: {
        common: {
          msg: "Could not delete the user",
        },
      },
    });
  }
};

//exporting the controller
module.exports = {
  getUsers,
  addUser,
  removeUser,
};
