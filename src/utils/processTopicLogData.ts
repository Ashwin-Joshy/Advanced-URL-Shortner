import { getClicksByDate } from "./misc";

export function processTopicLogData(data: any) {
    const totalClicks = data.length
    const uniqueUsers = new Set(data.map((entry: any) => entry.ipAddress)).size;
    const clicksByDate = getClicksByDate(data)
    const urls = processData(data)
    return {
        totalClicks,
        uniqueUsers,
        clicksByDate,
        urls
    }
}
const processData = (data: any[]) => {
    const result = data.reduce((acc: any, entry: any) => {
        const { ipAddress, alias } = entry;

        if (!acc[alias]) {
            acc[alias] = { totalClicks: 0, uniqueUsers: new Set() };
        }
        acc[alias].totalClicks += 1;
        acc[alias].uniqueUsers.add(ipAddress);

        return acc;
    }, {});

    return Object.entries(result).map(([keyName, { totalClicks, uniqueUsers }]: any) => ({
        shortUrl: keyName,
        totalClicks,
        uniqueUsers: uniqueUsers.size,
    }));
};