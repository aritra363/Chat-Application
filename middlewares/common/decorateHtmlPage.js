/* 
  Title : Decorate Html Page
  Description : Used for populate the html page 
  Author : Aritra Pal
  Date : 19/12/2022 
*/

//main function
const decorateHtmlPage = (page_title) => {
  return function (req, res, next) {
    //set the html local variable to true so that it send html response
    res.locals.html = true;
    res.locals.title = `${page_title}-${process.env.APP_NAME}`;
    next();
  };
};

//exports
module.exports = decorateHtmlPage;
