/* 
  Title : Single Upload
  Description : Single file uploading function 
  Author : Aritra Pal
  Date : 20/12/2022 
*/
//dependencies
const multer = require("multer");
const path = require("path");
const createError = require("http-errors")

//main code to upload a file through multer
const uploader = (upload_subfolder,allowed_file_types,max_file_size,error_msg) => {
  //file upload
    //make upload folder path
    const UPLOAD_FOLDER = path.join(__dirname,"../public/uploads",upload_subfolder)
    //make diskstorage
    const storage = multer.diskStorage({
      //set the destination path
      destination : (req,file,cb) => {
        cb(null,UPLOAD_FOLDER)
      },
      //setting filename
      filename:(req,file,cb) => {
        const fileext = path.extname(file.originalname)
        const filename = file.originalname
                          .replace(fileext,"")
                          .split(" ")
                          .join("-")
                          +"-"+Date.now();
        cb(null,filename+fileext)
      },
    })
    //prepare the final multer upload object
    const upload = multer({
      storage:storage,
      limits:{
        fieldSize : max_file_size
      },
      filefilter:(req,file,cb) =>{
        if (allowed_file_types.includes(file.mimetype)){
          cb(null,true)
        } else {
          cb (createError(error_msg))
        }
      }
    })
  return upload;
}

//exporting the uploader function
module.exports = uploader