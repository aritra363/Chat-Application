/* 
  Title : Users Router 
  Description : Handles all User Related Routes 
  Author : Aritra Pal
  Date : 19/12/2022 
*/

//external dependencies
const express = require("express");

//internal dependencies
const { getUsers, addUser,removeUser } = require("../controller/usersControllers");
const decorateHtmlPage = require("../middlewares/common/decorateHtmlPage");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  userValidator,
  addUserValidationHandler,
} = require("../middlewares/users/userValidator");

//making router object
const router = express();

//GET user Page
router.get("/", decorateHtmlPage("Users"), getUsers);

//add user
router.post(
  "/",
  avatarUpload,
  userValidator,
  addUserValidationHandler,
  addUser
);
//delete user
router.delete("/:id",removeUser)

//exporting the router
module.exports = router;
