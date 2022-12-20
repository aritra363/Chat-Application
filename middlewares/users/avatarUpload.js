/* 
  Title : Avatar upload
  Description : Middleware that uploads users's avatar 
  Author : Aritra Pal
  Date : 20/12/2022 
*/
//dependencies
const uploader = require("../../utilities/singleUpload");

//avatar upload middleware that calls the uploader function that has the multer functionality
const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatars", //folder name
    ["image/jpeg", "image/jpg", "image/png"], //file types to allow
    1000000, //filesize to allow
    "only jpeg,jpg,png and file size less than 1mb" //error message if any error occurs
  );
  //now we must call the upload.any() here so that we can handle its error here
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).send({
        error: {
          avatars: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

//exporting the avatarupload middleware
module.exports = avatarUpload;
