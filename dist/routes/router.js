import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkForAliases, createNewShortUrl } from '../utils/dbHelper';
const router = Router();
router.get('/example', authenticateToken, (req, res) => {
    res.send('Example endpoint');
});
router.post('/shorten', async (req, res) => {
    // const { error, value }: { error?: Joi.ValidationError; value: UrlShortenerRequest } = schema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({ error: error.details[0].message });
    // }
    const { url, customAlias, topic } = req.body;
   // const shortUrl = customAlias ? customAlias : nanoid(8);
   const shortUrl = customAlias ? customAlias :"1234";
    if (await checkForAliases(shortUrl)) {
        res.status(400).json({ error: 'Alias is already in use.' });
    }
    console.log("User data", req.user);
    const createdAt = new Date();
    createNewShortUrl(shortUrl, url, topic, createdAt, "test");
    const URL_PREFIX = process.env.URL_PREFIX;
    const response = {
        shortUrl: URL_PREFIX + shortUrl,
        createdAt
    };
    res.status(201).json(response);
});
export default router;
