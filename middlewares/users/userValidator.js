/* 
  Title : User Validator
  Description : Validate user fields with express validator and handel validation function
  Author : Aritra Pal
  Date : 20/12/2022 
*/
//dependencies
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const { unlink } = require("fs");
const path = require("path");

//internal dependencies
const peopleModel = require("../../helpers/models/peopleModel");

//main validator (check("formname") is a validator middleware)
const userValidator = [
  check("name")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be min 3 and max 30 characters")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Only alphabets")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid Email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await peopleModel.findOne({ email: value });
        if (user) {
          throw createError("Email already Exist");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("en-IN", { strictMode: true })
    .custom(async (value) => {
      try {
        const user = await peopleModel.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile number already Exist");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be 8 Character long and contain atleast 1 Uppercase , 1 Lowercase , 1 Number and 1 Symbol"
    ),
];

//function to handle validation related errors
const addUserValidationHandler = (req, res, next) => {
  //get the error if any
  const errors = validationResult(req);
  //now map the error(beautify)
  const mappedErrors = errors.mapped();
  //check if there are any error
  if (Object.keys(mappedErrors).length === 0) {
    //no error
    next();
  } else {
    //remove the uploaded file
    //check if file exists
    if (req.files && req.files.length > 0) {
      const { filename } = req.files[0];
      const filePath = path.join(
        __dirname,
        "../../public/uploads/avatars/",
        filename
      );
      unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    //send reponse
    res.status(500).send({
      errors: mappedErrors,
    });
  }
};

//exporting the validator
module.exports = {
  userValidator,
  addUserValidationHandler,
};
