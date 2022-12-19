/* 
  Title : Users Controller
  Description : Deals with all the middleware required for the Users route
  Author : Aritra Pal
  Date : 19/12/2022 
*/

//getUsers function (render the index page)
const getUsers = (req, res, next) => {
  res.render("users");
};

//exporting the controller
module.exports = {
  getUsers,
};
