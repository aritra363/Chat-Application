/* 
  Title : Inbox Controller
  Description : Deals with all the middleware required for the Inbox related route
  Author : Aritra Pal
  Date : 19/12/2022 
*/

//getInbox function (render the index page)
const getInbox = (req, res, next) => {
  res.render("inbox");
};

//exporting the controller
module.exports = {
  getInbox,
};
