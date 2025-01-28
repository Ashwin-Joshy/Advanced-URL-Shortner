import rateLimit from 'express-rate-limit';
import * as dotenv from 'dotenv'

dotenv.config()
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '60000')
const MAX_REQUEST_PER_WINDOW = parseInt(process.env.MAX_REQUEST_PER_WINDOW || '20')
export const rateLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW, 
  max: MAX_REQUEST_PER_WINDOW,
  message: {
    error: 'Too many requests, please try again after a minute.',
    isSuccess: false,
  },
  standardHeaders: true, 
  legacyHeaders: false
});
