import express from 'express';
import imageApi from './image';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('server is running');
});

router.use('/images', imageApi);

export default router;
