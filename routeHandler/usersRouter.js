/* 
  Title : Users Router 
  Description : Handles all User Related Routes 
  Author : Aritra Pal
  Date : 19/12/2022 
*/

//extrenal dependencies
const express = require("express");

//internal dependencies
const { getUsers } = require("../controller/usersControllers");
const decorateHtmlPage = require("../middlewares/common/decorateHtmlPage");

//making router object
const router = express();

//Login GET req
router.get("/", decorateHtmlPage("Users"), getUsers);

//exporting the router
module.exports = router;
