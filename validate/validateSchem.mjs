import { body } from "express-validator";

class ValidateSchem {
  static prodValidate = [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({min: 3, max: 100})
      .withMessage('Title must be between 3 and 100 characters long')
      .trim()
      .escape(),
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isNumeric()
      .withMessage('Price must be a number')
      .isFloat({min: 1})
      .withMessage('Price must be a positive number')
      .trim()
      .escape(),
    body('counter')
      .notEmpty()
      .withMessage('Counter is required')
      .isNumeric()
      .withMessage('Counter must be a number')
      .isInt({min: 1})
      .withMessage('Counter must be a positive integer')
      .trim()
      .escape(),
  ]
}

export default ValidateSchem;