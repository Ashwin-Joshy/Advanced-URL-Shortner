import request from 'supertest';
import express from 'express';
import { rateLimiter } from './rateLimiter';

describe('Rate Limiter Middleware', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(rateLimiter);
    app.get('/', (req, res) => {
      res.status(200).json({ message: 'Request successful', isSuccess: true });
    });
  });

  it('should allow requests within the limit', async () => {
    for (let i = 0; i < 3; i++) {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Request successful', isSuccess: true });
    }
  });

  it('should block requests exceeding the limit', async () => {
    for (let i = 0; i < 21; i++) {
      await request(app).get('/'); // Consumes the allowed requests
    }

    const response = await request(app).get('/');
    expect(response.status).toBe(429); // Too many requests
    expect(response.body).toEqual({
      error: 'Too many requests, please try again after a minute.',
      isSuccess: false,
    });
  });

  it('should reset the limit after the window expires', async () => {
    jest.useFakeTimers(); // Use fake timers to simulate window expiry

    for (let i = 0; i < 21; i++) {
      await request(app).get('/');
    }

    let response = await request(app).get('/');
    expect(response.status).toBe(429); // Blocked

    jest.advanceTimersByTime(60000); // 60 seconds (window duration)

    response = await request(app).get('/');
    expect(response.status).toBe(200); // Allowed again
    expect(response.body).toEqual({ message: 'Request successful', isSuccess: true });

    jest.useRealTimers();
  });
});
