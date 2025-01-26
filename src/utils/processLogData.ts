import { getClicksByDate, processData } from "./misc";

export const processLogData = (data:any) => {
    const totalClicks = data.length
    const uniqueUsers = new Set(data.map((entry: any) => entry.ipAddress)).size;
    const clicksByDate = getClicksByDate(data)
    const osType = processData(data, "deviceName");
    const deviceType = processData(data, "deviceType");
    return {
        totalUrls:0,
        totalClicks,
        uniqueUsers,
        clicksByDate,
        osType,
        deviceType
    }
}