import express from 'express';
import createResizedFile from '../utilities/resize';

const router = express.Router();

router.get(
  '/',
  // create a reseized image incase it is not available
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (!req.query.fileName || !req.query.width || !req.query.height) {
        let error = 'Some input value(s) are missing :';
        error += (!req.query.fileName && ' fileName') || '';
        error += (!req.query.width && ' width') || '';
        error += (!req.query.height && ' height') || '';
        res.status(400).send(error);
        throw new Error(error);
      }
      await createResizedFile(
        req.query.fileName as string,
        parseInt(req.query.width as string) as number,
        parseInt(req.query.height as string) as number,
        next
      );
    } catch (err) {
      next(err);
    }
  },
  // return the appropriate image
  (req: express.Request, res: express.Response) => {
    res.sendFile(
      `${process.cwd()}/src/assets/lib/${req.query.fileName}-${
        req.query.width
      }-${req.query.height}.jpeg`
    );
  }
);

export default router;
