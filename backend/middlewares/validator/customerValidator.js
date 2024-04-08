import {validationResult, body} from "express-validator"

export const validateRequest = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
    res.status(422).send({ errors: result.array() });
  }

export const customerValidator = [
    body("firstname")
    .notEmpty()
    .withMessage("Firstname required")
    .trim()
    .escape(),
    body("lastname")
    .notEmpty()
    .withMessage("Lastname required")
    .trim()
    .isString()
    .escape(),
    body("password")
    .notEmpty()
    .withMessage("password required")
    .trim()
    .isStrongPassword()
    .withMessage("Password is not safe enough")
    .isLength({min: 8})
    .escape(),
    body("email")
    .notEmpty()
    .withMessage("email required")
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape()
]