import { getClicksByDate } from "./misc";

export function processTopicLogData(data: any, totalUrls: any) {
    const totalClicks = data.length
    const uniqueUsers = new Set(data.map((entry: any) => entry.ipAddress)).size;
    const clicksByDate = getClicksByDate(data)
    const urls = processData(data)
    const urlList = totalUrls.map((urlData: any) => urlData.alias)
    const temp=urls?.map((urlData: any) => urlData.shortUrl) || []
    const unUsedUrls = urlList.filter((url: any) => !temp.includes(url))
    
    if(unUsedUrls.length) processUnusedUrls(unUsedUrls, urls);
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

const processUnusedUrls = (unUsedUrls: string[], urls: { shortUrl: any; totalClicks: any; uniqueUsers: any; }[]) => {
    if (unUsedUrls.length) {
        unUsedUrls.forEach((url: any) => {
            urls.push({
                shortUrl: url,
                totalClicks: 0,
                uniqueUsers: 0
            });
        });
    }
}
