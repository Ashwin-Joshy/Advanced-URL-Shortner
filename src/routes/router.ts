
import { Router } from 'express';

const router = Router();

router.get('/example', (req, res) => {
  res.send('Example endpoint');
});

export default router;
