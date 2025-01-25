import { Request, Response, Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkForAliases, createNewShortUrl, getUserDetails } from '../utils/dbHelper';
import { generateUniqueId } from '../utils/misc';

const router = Router();

router.post('/shorten', authenticateToken, async (req: any, res: any) => {
  try {
    const { url, customAlias, topic="General" } = req.body;
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

export default router;
