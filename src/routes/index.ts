import express from 'express';
import imageApi from './image';

const router = express.Router();

router.use('/images', imageApi);

export default router;
