import { param, validationResult } from 'express-validator';

const validateCountryCode = [
  param('countryCode')
    .isAlpha().withMessage('Country code must contain only letters')
    .isLength({ min: 2, max: 2 }).withMessage('Country code must be 2 letters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid country code' });
    }
    next();
  }
];
export default validateCountryCode; 