import { param, validationResult } from 'express-validator';
import { failure } from '../utils/responseHelper';

const validateCountryCode = [
  param('countryCode')
    .isAlpha().withMessage('Country code must contain only letters')
    .isLength({ min: 2, max: 2 }).withMessage('Country code must be 2 letters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(failure('Invalid country code'));
    }
    next();
  }
];
export default validateCountryCode; 