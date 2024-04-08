import {validationResult, body} from "express-validator"

export const validateRequest = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
    res.status(422).send({ errors: result.array() });
  }

export const accountValidator = [
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
    .escape(),
    body("budget")
    .optional()
    .escape()
]

export const accountUpdateValidator = (fieldsToUpdate) => {
  const validators = [];

  if (fieldsToUpdate.includes("firstname")) {
    validators.push(
      body("firstname")
        .if(body("firstname").exists({ checkFalsy: true }))
        .trim()
        .isString()
        .escape()
    );
  }

  if (fieldsToUpdate.includes("lastname")) {
    validators.push(
      body("lastname")
        .if(body("lastname").exists({ checkFalsy: true }))
        .trim()
        .isString()
        .escape()
    );
  }

  if (fieldsToUpdate.includes("password")) {
    validators.push(
      body("password")
        .if(body("password").exists({ checkFalsy: true }))
        .trim()
        .isStrongPassword()
        .withMessage("Password is not safe enough")
        .isLength({ min: 8 })
        .escape()
    );
  }

  if (fieldsToUpdate.includes("email")) {
    validators.push(
      body("email")
        .if(body("email").exists({ checkFalsy: true }))
        .trim()
        .isEmail()
        .normalizeEmail()
        .escape()
    );
  }

  if (fieldsToUpdate.includes("budget")) {
    validators.push(
      body("budget")
        .if(body("budget").exists({ checkFalsy: true }))
        .optional()
        .escape()
    );
  }

  return validators;
};