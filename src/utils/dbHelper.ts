import redisClient from "../clients/redisClient";
import { AppDataSource, getRepo } from "../datasource";
import { Logs } from "../entities/Logs";
import { Url } from "../entities/Url";
import { User } from "../entities/User";
import * as dotenv from "dotenv";

dotenv.config()
const redisExpiry = parseInt(process.env.REDIS_EXPIRY || '84000')
const getUser = (email: string) => {
  const userRepo = AppDataSource.getRepository(User);
  return userRepo.findOne({ where: { email } });
}
const createUser = async (email: string, name: string, googleId: string, password: string) => {
  const userRepo = AppDataSource.getRepository(User);
  const newUser = new User();
  newUser.email = email;
  newUser.name = name;
  newUser.googleId = googleId;
  newUser.password = password;
  await userRepo.save(newUser);
}
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
}
const getUserDetails = async (email: string, includeUrls: boolean = false) => {
  const userRepo = await getRepo(User);
  const user = await userRepo.findOne({
    where: { email },
    relations: includeUrls ? ['urls'] : [],
  });
  if (!user) return Promise.reject(new Error("User not found"));
  return user;
}
const findUrl = async (alias: string) => {
  const cachedUrl = await redisClient.get(`alias:${alias}`);
  if (cachedUrl) {
    console.log('Cache hit');
    return JSON.parse(cachedUrl);
  }
  console.log('Cache miss');
  const urlRpo = await getRepo(Url);
  const url = await urlRpo.findOne({ where: { alias } });
  if (!url) return Promise.reject({ status: 404, message: "Url not found" });

  await redisClient.set(`alias:${alias}`, JSON.stringify(url), {
    EX: redisExpiry,
  });

  return url;
}
const addLog = async (ipAddress: any, shortUrl: any, deviceName: any, country: any, deviceType: string, topic: string) => {
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
  const logData = await urlRpo.find({ where: { [key]: searchValue } });

  return logData;
}
const getAllLogData = async (aliasList: Array<string> = [""]) => {
  const urlRpo = await getRepo(Logs);
  return urlRpo.createQueryBuilder('log')
    .where('log.alias IN (:...aliasList)', { aliasList })
    .getMany();
}
const getTopicData = async (topic: string) => {
  const urlRpo = await getRepo(Url);
  return urlRpo.find({ where: { topic } });
}

export { getUser, createUser, checkForAliases, createNewShortUrl, getUserDetails, findUrl, addLog, getLogData, getAllLogData, getTopicData }