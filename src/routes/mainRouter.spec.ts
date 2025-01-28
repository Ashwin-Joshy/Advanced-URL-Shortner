import request from 'supertest';
import express, { Request, Response } from 'express';
import router from './mainRouter';
import { authenticateToken } from '../middlewares/authMiddleware';
import { rateLimiter } from '../middlewares/rateLimiter';
import { addLog, checkForAliases, createNewShortUrl, findUrl, getUserDetails } from '../utils/dbHelper';
import { generateUniqueId, getDeviceType } from '../utils/misc';
import { getGeolocation } from '../utils/getGeoLocation';

jest.mock('../middlewares/authMiddleware');
jest.mock('../middlewares/rateLimiter');
jest.mock('../utils/misc', () => ({
    generateUniqueId: jest.fn(() => {
        return ("generatedAlias");
    }),
    getDeviceType: jest.fn(() => {
        return ("Desktop");
    }),
}));
jest.mock("../middlewares/authMiddleware", () => ({
    authenticateToken: jest.fn((req, res, next) => {
        req.user = { id: "mockUserId", };
        next();
    }),
}));
jest.mock("../middlewares/rateLimiter", () => ({
    rateLimiter: jest.fn((req, res, next) => next()),
}))
jest.mock('../utils/getGeoLocation');
jest.mock("../utils/dbHelper", () => ({
    getAllLogData: jest.fn(),
    getLogData: jest.fn(),
    getUserDetails: jest.fn(),
    checkForAliases: jest.fn(),
    createNewShortUrl: jest.fn(),
    findUrl: jest.fn(()=>{
        return Promise.resolve({ url: 'https://example.com', topic: 'TestTopic' })
    }),
    addLog: jest.fn(()=>{ return Promise.resolve(true)}),
}));

const app = express();
app.use(express.json());
app.use('/', router);

describe('URL Shortening Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });
    describe('POST /shorten', () => {
        it('should return 400 if URL is missing', async () => {
            const response = await request(app)
                .post('/shorten')
                .send({ customAlias: 'myAlias', topic: 'TestTopic' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('URL is required.');
        });

        it('should return 400 if custom alias is already in use', async () => {
            (checkForAliases as jest.Mock).mockImplementation(() => true);

            const response = await request(app)
                .post('/shorten')
                .send({ url: 'https://example.com', customAlias: 'existingAlias' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Alias is already in use.');
        });

        it('should create a new short URL with a custom alias', async () => {
            (checkForAliases as jest.Mock).mockImplementation(() => false);
            jest.mock("../utils/dbHelper", () => ({
                getUserDetails: jest.fn(() => {
                    return Promise.resolve({ id: 'user123', urls: [] });
                }),
                createNewShortUrl: jest.fn(() => {
                    return Promise.resolve(true);
                }),
            }));

            const response = await request(app)
                .post('/shorten')
                .send({ url: 'https://example.com', customAlias: 'customAlias', topic: 'TestTopic' });

            expect(response.status).toBe(201);
            expect(response.body.shortUrl).toContain('customAlias');
        });

        it('should create a new short URL with a generated alias', async () => {
            jest.mock("../utils/dbHelper", () => ({
                getUserDetails: jest.fn(() => {
                    return Promise.resolve({ id: 'user123', urls: [] });
                }),
                createNewShortUrl: jest.fn(() => {
                    return Promise.resolve(true);
                }),
                checkForAliases: jest.fn(() => {
                    return Promise.resolve(false);
                }),
            }));
            jest.mock("../middlewares/authMiddleware", () => ({
                authenticateToken: jest.fn((req, res, next) => {
                    req.user = { id: "user123", };
                    next();
                }),
            }));
            const response = await request(app)
                .post('/shorten')
                .send({ url: 'https://example.com', topic: 'TestTopic' });

            expect(response.status).toBe(201);
            expect(response.body.shortUrl).toContain('generatedAlias');
        });
    });

    describe('GET /shorten/:url', () => {
        it('should return 404 if shortUrl is missing', async () => {
            const response = await request(app).get('/shorten/');

            expect(response.status).toBe(404);
        });

        it('should redirect to the original URL if found', async () => {
            jest.mock('../utils/misc', () => ({
                getDeviceType: jest.fn(() => {
                    return ("Desktop");
                }),
            }));
            (getGeolocation as jest.Mock).mockImplementation(() => { return { status: true, country: 'US' } });
            const response = await request(app).get('/shorten/generatedAlias');

            expect(response.status).toBe(302);
            expect(response.header.location).toBe('https://example.com');
        });

        it('should return 500 if an error occurs', async () => {
            (findUrl as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/shorten/generatedAlias');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Database error');
        });
    });
});
