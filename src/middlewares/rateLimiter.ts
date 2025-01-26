import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // For sake of fucntionality I have manually added 1 min. Env is better way
  max: 20, //Same here
  message: {
    error: 'Too many requests, please try again after a minute.',
    isSuccess: false,
  },
  standardHeaders: true, 
  legacyHeaders: false
});
