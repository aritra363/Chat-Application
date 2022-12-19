/* 
  Title : Inbox Router 
  Description : Handles all Inbox Related Routes 
  Author : Aritra Pal
  Date : 19/12/2022 
*/

//external dependencies
const express = require("express");

//internal dependencies
const { getInbox } = require("../controller/inboxControllers");
const decorateHtmlPage = require("../middlewares/common/decorateHtmlPage")

//making router object
const router = express();

//Login GET req
router.get("/",decorateHtmlPage("Inbox"),getInbox);

//exporting the router
module.exports = router;
