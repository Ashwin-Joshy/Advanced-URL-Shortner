import request from "supertest";
import express from "express";
import authRoute from "./authRouter";
import {
    validateLoginInput,
    validateSignupInput,
} from "../utils/validators";
import {
    getUser ,
    createUser ,
} from "../utils/dbHelper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";

jest.mock("../utils/validators", () => ({
    validateLoginInput: jest.fn(),
    validateSignupInput: jest.fn(),
}));
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("passport", () => ({
    authenticate: jest.fn(() => (req: any, res: any, next: any) => next()),
}));
jest.mock("../utils/dbHelper", () => ({
    getUser:  jest.fn(),
    createUser : jest.fn(),
}));

const app = express();
app.use(express.json());
app.use("/auth", authRoute);

describe("Auth Route", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    describe("POST /auth/login", () => {
        it("should return a token for valid login", async () => {
            const mockUser  = { email: "test@example.com", password: "hashedPassword" };
            (validateLoginInput as jest.Mock).mockReturnValue({});
            (getUser  as jest.Mock).mockResolvedValue(mockUser );
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue("mockToken");

            const res = await request(app)
                .post("/auth/login")
                .send({ email: "test@example.com", password: "password" });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe("Logged in");
            expect(res.body.token).toBe("mockToken");
            expect(getUser ).toHaveBeenCalledWith("test@example.com");
            expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedPassword");
        });

        it("should return 400 for invalid input", async () => {
            (validateLoginInput as jest.Mock).mockReturnValue({ error: "Invalid input" });

            const res = await request(app)
                .post("/auth/login")
                .send({ email: "", password: "password" });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Invalid input");
        });

        it("should return 401 for invalid credentials", async () => {
            (validateLoginInput as jest.Mock).mockReturnValue({});
            (getUser  as jest.Mock).mockResolvedValue(null);

            const res = await request(app)
                .post("/auth/login")
                .send({ email: "test@example.com", password: "password" });

            expect(res.status).toBe(401);
            expect(res.body.message).toBe("Invalid credentials.");
        });
    });

    describe("POST /auth/signup", () => {
        it("should register a new user", async () => {
            (validateSignupInput as jest.Mock).mockReturnValue({});
            (getUser  as jest.Mock).mockResolvedValue(null);
            (createUser  as jest.Mock).mockResolvedValue(true);
            (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");

            const res = await request(app)
                .post("/auth/signup")
                .send({ username: "testuser", email: "test@example.com", password: "password" });

            expect(res.status).toBe(201);
            expect(res.body.message).toBe("User successfully registered.");
            expect(getUser ).toHaveBeenCalledWith("test@example.com");
            expect(createUser ).toHaveBeenCalledWith("test@example.com", "testuser", "", "hashedPassword");
        });

        it("should return 400 if user already exists", async () => {
            (validateSignupInput as jest.Mock).mockReturnValue({});
            (getUser  as jest.Mock).mockResolvedValue({ email: "test@example.com" });

            const res = await request(app)
                .post("/auth/signup")
                .send({ username: "testuser", email: "test@example.com", password: "password" });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe("User already exists.");
        });

        it("should return 400 for invalid input", async () => {
            (validateSignupInput as jest.Mock).mockReturnValue({ error: "Invalid input" });

            const res = await request(app)
                .post("/auth/signup")
                .send({ username: "", email: "test@example.com", password: "password" });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Invalid input");
        });
    });

    // describe("GET /auth/google", () => {
    //     it("should redirect for Google authentication", async () => {
    //         const res = await request(app).get("/auth/google");

    //         expect(passport.authenticate).toHaveBeenCalledWith("google", {
    //             scope: ["profile", "email"],
    //         });
    //     });
    // });

    // describe("GET /auth/google/callback", () => {
    //     it("should return a token on successful Google authentication", async () => {
    //         const mockUser  = { email: "test@example.com" };
    //         (jwt.sign as jest.Mock).mockReturnValue("mockToken");
    //         // Simulate setting the user in the request
    //         passport.authenticate.mockImplementation((strategy, options) => (req, res, next) => {
    //             req.user = mockUser ; // Simulate user being set
    //             next();
    //         });

    //         const res = await request(app)
    //             .get("/auth/google/callback");

    //         expect(res.status).toBe(200);
    //         expect(res.body.message).toBe("Google login successful");
    //         expect(res.body.token).toBe("mockToken");
    //     });

    //     it("should return 401 if user is not authenticated", async () => {
    //         const res = await request(app).get("/auth/google/callback");

    //         expect(res.status).toBe(401);
    //         expect(res.body.message).toBe("Authentication failed");
    //     });
    // });
});