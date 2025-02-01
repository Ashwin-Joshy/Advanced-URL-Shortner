import { Router } from "express";
import { getAllLogData, getLogData, getTopicData, getUserDetails } from "../utils/dbHelper";
import { processAliasLogData } from "../utils/processAliasLogData";
import { processTopicLogData } from "../utils/processTopicLogData";
import { authenticateToken } from "../middlewares/authMiddleware";
import { processLogData } from "../utils/processLogData";
import { rateLimiter } from "../middlewares/rateLimiter";

const analyticsRouter = Router();

analyticsRouter.get("/overall", rateLimiter, authenticateToken, async (req: any, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new Error("User not found")
        const user = await getUserDetails(userId, true)
        const aliasList = user?.urls?.map((url: any) => url.alias) || []
        const logData = aliasList.length ? await getAllLogData(aliasList) : []
        const processedData = processLogData(logData)
        processedData.totalUrls = user.urls.length

        res.status(200).json({ data: processedData });
    }
    catch (error: any) {
        console.log("error", error);
        res.status(500).json({ error: error.message || error, isSuccess: false });
    }
});
analyticsRouter.get("/topic/:topic", rateLimiter, async (req, res) => {
    try {
        const topic = req.params.topic;
        const topicLogData = await getLogData(topic, "topic")
        const topicList = await getTopicData(topic)
        const processedData = processTopicLogData(topicLogData,topicList)
        res.status(200).json({ data: processedData });
    }
    catch (error: any) {
        res.status(500).json({ error: error.message, isSuccess: false });
    }
});
analyticsRouter.get("/:alias", rateLimiter, async (req, res) => {
    try {
        const alias = req.params.alias;
        const alisaLogData = await getLogData(alias, "alias")
        const processedData = processAliasLogData(alisaLogData)
        res.status(200).json({ data: processedData });
    } catch (error: any) {
        res.status(500).json({ error: error.message, isSuccess: false });
    }
});

export default analyticsRouter
