import { AppDataSource, getRepo } from "../datasource";
import { Url } from "../entities/Url";
const checkForAliases = async (alias) => {
    const urlRpo = await getRepo(Url);
    const url = await urlRpo.findOne({ where: { alias } });
    if (url)
        return true;
    return false;
};
const createNewShortUrl = (alias, url, topic, createdAt, userEmail) => {
    const urlRpo = AppDataSource.getRepository(Url);
    const newUrl = new Url();
    newUrl.alias = alias;
    newUrl.url = url;
    newUrl.topic = topic;
    newUrl.createdDate = createdAt;
    newUrl.userEmail = userEmail;
    urlRpo.save(newUrl);
};
export { checkForAliases, createNewShortUrl };
