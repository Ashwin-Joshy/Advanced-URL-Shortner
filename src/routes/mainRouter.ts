import { Request, Response, Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { addLog, checkForAliases, createNewShortUrl, findUrl, getUserDetails } from '../utils/dbHelper';
import { generateUniqueId, getDeviceType } from '../utils/misc';
import { getGeolocation } from '../utils/getGeoLocation';
import { UAParser } from 'ua-parser-js';
import useragent from "express-useragent";

const router = Router();

router.post('/shorten', authenticateToken, async (req: any, res: any) => {
  try {
    const { url, customAlias, topic = "General" } = req.body;
    const shortUrl = customAlias ? customAlias : generateUniqueId();
    if (await checkForAliases(shortUrl)) {
      return res.status(400).json({ error: 'Alias is already in use.' });
    }
    const emailId = req.user?.id;
    const user = await getUserDetails(emailId)
    const createdAt = new Date();
    await createNewShortUrl(shortUrl, url, topic, createdAt, user);
    const URL_PREFIX = process.env.URL_PREFIX
    const response = {
      shortUrl: URL_PREFIX + shortUrl,
      createdAt
    };
    res.status(201).json(response);
  }
  catch (error: any) {
    res.status(500).json({ error: error.message, isSuccess: false });
  }
})
router.get('/shorten/:url',useragent.express(), async (req, res) => {
  try {
    const shortUrl = req.params.url;
    const deviceType = getDeviceType(req.useragent?.source || "")
    const os = req.useragent?.os
    const url = await findUrl(shortUrl)
    const ipAddress: any = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || "";
    const geoLocationData = await getGeolocation(ipAddress)
    const country = geoLocationData.status == true ? geoLocationData.country : "NA";
    const userAgent = req.headers['user-agent'] || "";
    // const parser = new UAParser();
    // const deviceDetails = parser.setUA(userAgent).getResult();
    console.log("Details", "IP", ipAddress, "details", os, "geolocation", geoLocationData,"devicetype",deviceType);
    await addLog(ipAddress, shortUrl, os, country,deviceType)
    return res.status(301).redirect(url);
  }
  catch (error: any) {
    res.status(500).json({ error: error.message, isSuccess: false });
  }
})
export default router;
