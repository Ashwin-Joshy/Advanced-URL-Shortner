import { Router } from "express";
import { getAliasLogData } from "../utils/dbHelper";
import { processAliasLogData } from "../utils/processAliasLogData";

const analyticsRouter = Router();

analyticsRouter.get("/:alias", async (req, res) => {
    const alias = req.params.alias;
    const alisaLogData = await getAliasLogData(alias)
    const processedData = processAliasLogData(alisaLogData)
    res.status(200).json({ data:processedData });
});

export default analyticsRouter
