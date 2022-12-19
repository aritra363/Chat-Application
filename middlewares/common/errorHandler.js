/* 
  Title : Error Handler 
  Description : 404 and Common Error Handler 
  Author : Aritra Pal
  Date : 19/12/2022 
*/

//dependencies
const createError = require("http-errors");

//404 handler
const notFoundHandler = (req, res, next) => {
  next(createError(404, "Your Requested Content is not Found"));
};

//Common Error Handler
const commonErrorHandler = (err, req, res, next) => {
  //check if the environment is production or development accordingly set error
  res.locals.error =
    process.env.NODE_ENV === "development"
      ? err
      : { message: err.message, status: err.status || 500 };
  //set status code
  res.status(err.status || 500);
  //check whether to send html or json response
  if (res.locals.html) {
    //send html response
    res.render("error", {
      title: "404 Not Found",
    });
  } else {
    //send json response
    res.send({
      message: res.locals.error.message,
      Stack: res.locals.error.stack,
    });
  }
};

//export
module.exports = { commonErrorHandler, notFoundHandler };
