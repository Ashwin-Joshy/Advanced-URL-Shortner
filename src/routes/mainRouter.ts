import { Request, Response, Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { addLog, checkForAliases, createNewShortUrl, findUrl, getUserDetails } from '../utils/dbHelper';
import { generateUniqueId, getDeviceType } from '../utils/misc';
import { getGeolocation } from '../utils/getGeoLocation';
import useragent from "express-useragent";
import { rateLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.post('/shorten', rateLimiter, authenticateToken, async (req: any, res: any) => {
  try {
    const { url, customAlias, topic = "General" } = req.body;
    const shortUrl = customAlias || generateUniqueId();

    if (!url) return res.status(400).json({ isSuccess: false, error: 'URL is required.' });
    if (await checkForAliases(shortUrl)) return res.status(400).json({ isSuccess: false, error: 'Alias is already in use.' });

    const userId = req.user?.id;
    const user = await getUserDetails(userId)
    const createdAt = new Date();

    await createNewShortUrl(shortUrl, url, topic, createdAt, user);

    const URL_PREFIX = process.env.URL_PREFIX || ""
    const response = {
      shortUrl: URL_PREFIX + shortUrl,
      createdAt
    };

    res.status(201).json(response);
  }
  catch (error: any) {
    console.log("error", error);
    res.status(500).json({ error: error.message || error, isSuccess: false });
  }
})
router.get('/shorten/:url', useragent.express(), async (req: any, res: any) => {
  try {
    const shortUrl = req.params.url;

    if (!shortUrl) return res.status(400).json({ isSuccess: false, error: 'shortUrl is required.' });

    const deviceType = getDeviceType(req.useragent?.source || "")
    const os = req.useragent?.os || "Unknown"
    const url = await findUrl(shortUrl)

    if (!url?.url) return res.status(400).json({ isSuccess: false, error: 'shortUrl is invalid.' })

    const ipAddress: any = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || "";
    const geoLocationData = await getGeolocation(ipAddress)
    const country = geoLocationData.status == true ? geoLocationData.country : "NA";

    await addLog(ipAddress, shortUrl, os, country, deviceType, url.topic)
    return res.status(301).redirect(url.url);
  }
  catch (error: any) {
    console.log("error", error);
    res.status(error.status || 500).json({ error: error.message || error, isSuccess: false });
  }
})
export default router;
