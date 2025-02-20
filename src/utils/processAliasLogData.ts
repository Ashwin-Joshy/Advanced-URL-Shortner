import { getClicksByDate, processData } from "./misc";

export const processAliasLogData = (data: any) => {
    const totalClicks = data.length;
    const uniqueUsers = new Set(data.map((entry: any) => entry.ipAddress)).size;
    const clicksByDate = getClicksByDate(data)
    const osType = processData(data, "deviceName");
    const deviceType = processData(data, "deviceType");
    return {
        totalClicks,
        uniqueUsers,
        clicksByDate,
        osType,
        deviceType
    }
}
