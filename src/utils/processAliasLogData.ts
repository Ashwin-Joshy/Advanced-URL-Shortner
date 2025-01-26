export const processAliasLogData = (data: any) => {
    const totalClicks = data.length;
    const uniqueUsers = new Set(data.map((entry: any) => entry.ipAddress)).size;
    const clicksByDate = data.reduce((acc: any, entry: any) => {
        const date = new Date(entry.timestamp).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        console.log("date",date,entry.timestamp);
        
        return acc;
    }, {});
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
const processData = (data: any[], key: string) => {
    const result = data.reduce((acc: any, entry: any) => {
        const keyValue = entry[key];
        const { ipAddress } = entry;

        if (!acc[keyValue]) {
            acc[keyValue] = { uniqueClicks: 0, uniqueUsers: new Set() };
        }
        acc[keyValue].uniqueClicks += 1;
        acc[keyValue].uniqueUsers.add(ipAddress);

        return acc;
    }, {});

    return Object.entries(result).map(([keyName, { uniqueClicks, uniqueUsers }]: any) => ({
        [key]: keyName,
        uniqueClicks,
        uniqueUsers: uniqueUsers.size,
    }));
};