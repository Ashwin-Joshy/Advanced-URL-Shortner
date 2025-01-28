import { authenticateToken } from './authMiddleware';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('authenticateToken Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should respond with 401 if no token is provided', () => {
        req.headers = {};

        authenticateToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Access denied' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should respond with 403 if the token is invalid', () => {
        req.headers = { authorization: 'Bearer invalidtoken' };
        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback(new Error('Invalid token'), null);
        });

        authenticateToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next and attach user to request if the token is valid', () => {
        const mockUser = { id: 1, name: 'Test User' };
        req.headers = { authorization: 'Bearer validtoken' };
        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback(null, mockUser);
        });

        authenticateToken(req as Request, res as Response, next);

        expect(jwt.verify).toHaveBeenCalledWith('validtoken', process.env.JWT_SECRET, expect.any(Function));
        expect((req as any).user).toEqual(mockUser);
        expect(next).toHaveBeenCalled();
    });
});
