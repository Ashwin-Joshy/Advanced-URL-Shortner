import { AppDataSource, getRepo } from "../datasource";
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
const getUserDetails = async (emailId: string) => {
  const userRepo = await getRepo(User);
  const user = await userRepo.findOneBy({ email: emailId });
  if (!user) return Promise.reject("User not found");
  return user;
}
export { checkForAliases, createNewShortUrl, getUserDetails }