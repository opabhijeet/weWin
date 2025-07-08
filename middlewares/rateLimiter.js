import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 60 * 1000,     // 1 minute
  max: 30,                 // limit each IP to 30 requests per minute
  standardHeaders: true,  // send rate limit info in headers
  legacyHeaders: false,   // disable X-RateLimit headers
  handler: (req, res) => {
    res.status(429).json(failure('Too many requests, please try again later'));
  }
});