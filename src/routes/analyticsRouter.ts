import { Router } from "express";
import { getLogData } from "../utils/dbHelper";
import { processAliasLogData } from "../utils/processAliasLogData";
import { processTopicLogData } from "../utils/processTopicLogData";

const analyticsRouter = Router();
analyticsRouter.get("/topic/:topic", async (req, res) => {
    try {
        const topic = req.params.topic;
        const topicLogData = await getLogData(topic, "topic")
        const processedData = processTopicLogData(topicLogData)
        console.log("Entered topic,", topicLogData,processedData,topic);
        
        res.status(200).json({ data: processedData });
    }
    catch (error: any) {
        res.status(500).json({ error: error.message, isSuccess: false });
    }
});
analyticsRouter.get("/:alias", async (req, res) => {
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
