/* 
  Title : Login Controller
  Description : Deals with all the middleware required for the login route
  Author : Aritra Pal
  Date : 19/12/2022 
*/

//getLogin function (render the index page)
const getLogin = (req, res, next) => {
  res.render("index");
};

//exporting the controller
module.exports = {
  getLogin,
};
