import { AppDataSource, getRepo } from "../datasource";
import { Logs } from "../entities/Logs";
import { Url } from "../entities/Url";
import { User } from "../entities/User";

const checkForAliases = async (alias: string): Promise<boolean> => {
  const urlRpo = await getRepo(Url);
  const url = await urlRpo.findOne({ where: { alias } });
  if (url) return true;
  return false;
};
const createNewShortUrl = async (alias: string, url: string, topic: string, createdAt: Date, user: any) => {
  const urlRpo = AppDataSource.getRepository(Url);
  const newUrl = new Url();
  newUrl.alias = alias;
  newUrl.url = url;
  newUrl.topic = topic;
  newUrl.createdDate = createdAt;
  newUrl.user = user;
  await urlRpo.save(newUrl);
  console.log("New entry URL", newUrl);

}
const getUserDetails = async (userId: string) => {
  const userRepo = await getRepo(User);
  const user = await userRepo.findOneBy({ id: userId });
  if (!user) return Promise.reject("User not found");
  return user;
}
const findUrl = async (alias: string) => {
  const urlRpo = await getRepo(Url);
  const url = await urlRpo.findOne({ where: { alias } });
  if (!url) return Promise.reject("Url not found");
  return url;
}
const addLog = async (ipAddress: any, shortUrl: any, deviceName: any, country: any, deviceType: string, topic:string) => {
  const urlRpo = await getRepo(Logs);
  const newLog = new Logs();
  newLog.alias = shortUrl;
  newLog.ipAddress = ipAddress;
  newLog.deviceName = deviceName;
  newLog.geoLocation = country;
  newLog.deviceType = deviceType;
  newLog.topic = topic;
  newLog.timestamp = new Date();
  urlRpo.save(newLog);
}
const getLogData = async (searchValue: string, key: string) => {
  const urlRpo = await getRepo(Logs);
  return urlRpo.find({ where: { [key]: searchValue } });
}
export { checkForAliases, createNewShortUrl, getUserDetails, findUrl, addLog, getLogData }