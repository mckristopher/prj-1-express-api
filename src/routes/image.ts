import express from 'express';
import createResizedFile from './resize';

const router = express.Router();

router.get(
  '/',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    await createResizedFile(
      req.query.fileName as string,
      parseInt(req.query.width as string) as number,
      parseInt(req.query.height as string) as number,
      next
    );
  },
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.sendFile(
      `${process.cwd()}/src/assets/lib/${req.query.fileName}-${
        req.query.width
      }-${req.query.height}.jpg`
    );
  }
);

export default router;
