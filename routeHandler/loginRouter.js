/* 
  Title : Login Router 
  Description : Handles all Login Routes 
  Author : Aritra Pal
  Date : 19/12/2022 
*/

//extrenal dependencies
const express = require("express");

//internal dependencies
const { getLogin } = require("../controller/loginControllers");
const decorateHtmlPage = require("../middlewares/common/decorateHtmlPage");

//making router object
const router = express();

//Login GET req
router.get("/", decorateHtmlPage("Login"), getLogin);

//exporting the router
module.exports = router;
