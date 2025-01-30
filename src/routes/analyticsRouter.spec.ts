import request from "supertest";
import express from "express";
import analyticsRouter from "./analyticsRouter";
import { getAllLogData, getLogData, getUserDetails } from "../utils/dbHelper";

import { authenticateToken } from "../middlewares/authMiddleware";
import { processLogData } from "../utils/processLogData";
import { processAliasLogData } from "../utils/processAliasLogData";
import { processTopicLogData } from "../utils/processTopicLogData";

jest.mock("../utils/dbHelper", () => ({
    getAllLogData: jest.fn(),
    getLogData: jest.fn(),
    getUserDetails: jest.fn(),
}));
jest.mock("../utils/processLogData");
jest.mock("../utils/processAliasLogData");
jest.mock("../utils/processTopicLogData");

jest.mock("../middlewares/authMiddleware", () => ({
    authenticateToken: jest.fn((req, res, next) => {
        req.user = { id: "mockUserId", };
        next();
    }),
}));
jest.mock("../middlewares/rateLimiter", () => ({
    rateLimiter: jest.fn((req, res, next) => next()),
}))

const app = express();
app.use(express.json());
app.use("/analytics", analyticsRouter);

describe("Analytics Router", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    describe("GET /analytics/overall", () => {
        it("should return processed data for overall analytics", async () => {
            const mockUser = {
                id: "mockUserId",
                urls: [{ alias: "alias1" }, { alias: "alias2" }],
            };
            jest.mock("../utils/dbHelper", () => ({
                getUserDetails: jest.fn(()=>{
                    return Promise.resolve(mockUser);
                }),
            }));
            const mockLogData: any = [];
            const mockProcessedData = { totalClicks: 100 };
            (getUserDetails as jest.Mock).mockImplementation(() => Promise.resolve(mockUser));
            (getAllLogData as jest.Mock).mockImplementation(() => mockLogData);
            (processLogData as jest.Mock).mockImplementation(() => mockProcessedData);

            const res = await request(app)
                .get("/analytics/overall")
                .set("Authorization", "Bearer token");

            expect(res.status).toBe(200);
            expect(res.body.data).toEqual({
                totalClicks: 100,
                totalUrls: 2,
            });
            expect(getUserDetails).toHaveBeenCalledWith("mockUserId", true);
            expect(getAllLogData).toHaveBeenCalledWith(["alias1", "alias2"]);
            expect(processLogData).toHaveBeenCalledWith(mockLogData);
        });

        it("should return 500 if user is not found", async () => {
            (getUserDetails as jest.Mock).mockImplementation(()=>{
                return Promise.reject("User not found")
            });

            const res = await request(app)
                .get("/analytics/overall")
                .set("Authorization", "Bearer token");
            
            expect(res.status).toBe(500);
            expect(res.body.error).toBe("User not found");
        });
    });

    describe("GET /analytics/topic/:topic", () => {
        it("should return processed data for a specific topic", async () => {
            const mockTopicLogData: any = [];
            const mockProcessedData = { totalClicks: 50 };

            (getLogData as jest.Mock).mockResolvedValue(mockTopicLogData);
            (processTopicLogData as jest.Mock).mockImplementation(() => mockProcessedData);

            const res = await request(app).get("/analytics/topic/test-topic");

            expect(res.status).toBe(200);
            expect(res.body.data).toEqual(mockProcessedData);
            expect(getLogData).toHaveBeenCalledWith("test-topic", "topic");
            expect(processTopicLogData).toHaveBeenCalledWith(mockTopicLogData);
        });

        it("should return 500 if an error occurs", async () => {
            (getLogData as jest.Mock).mockRejectedValue(new Error("Database error"));

            const res = await request(app).get("/analytics/topic/test-topic");

            expect(res.status).toBe(500);
            expect(res.body.error).toBe("Database error");
        });
    });

    describe("GET /analytics/:alias", () => {
        it("should return processed data for a specific alias", async () => {
            const mockAliasLogData: any = [];
            const mockProcessedData = { totalClicks: 30 };

            (getLogData as jest.Mock).mockResolvedValue(mockAliasLogData);
            (processAliasLogData as jest.Mock).mockImplementation(() => mockProcessedData);

            const res = await request(app).get("/analytics/alias1");

            expect(res.status).toBe(200);
            expect(res.body.data).toEqual(mockProcessedData);
            expect(getLogData).toHaveBeenCalledWith("alias1", "alias");
            expect(processAliasLogData).toHaveBeenCalledWith(mockAliasLogData);
        });

        it("should return 500 if an error occurs", async () => {
            (getLogData as jest.Mock).mockRejectedValue(new Error("Database error"));

            const res = await request(app).get("/analytics/alias1");

            expect(res.status).toBe(500);
            expect(res.body.error).toBe("Database error");
        });
    });
});
