import { randomBytes } from 'crypto';

export function generateUniqueId(): string {
  return randomBytes(3).toString('hex').slice(0, 5);
}
export function getDeviceType(source: string) {
  if (/mobile/i.test(source)) {
    return "Mobile";
  } else if (/tablet|ipad|playbook|silk/i.test(source)) {
    return "Tablet";
  } else {
    return "Desktop";
  }
}
export function getClicksByDate(data: any) {
  data.reduce((acc: any, entry: any) => {
    const date = new Date(entry.timestamp).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
}
export function processData(data: any[], key: string) {
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
  if(key == "deviceName") key = "osName"
  return Object.entries(result).map(([keyName, { uniqueClicks, uniqueUsers }]: any) => ({
    [key]: keyName,
    uniqueClicks,
    uniqueUsers: uniqueUsers.size,
  }));
};