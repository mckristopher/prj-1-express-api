import express from 'express';
import rs, { FileType } from '../utilities/resize';

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
      if (!rs.fileExists(req.query.fileName as string)) {
        const error = 'Invalid File Name Specified';
        res.status(400).send(error);
        throw new Error(error);
      }
      console.log(isNaN(parseInt(req.query.width as string)));
      if (
        isNaN(req.query.width as unknown as number) ||
        isNaN(parseInt(req.query.width as string))
      ) {
        const error = 'Invalid Width Specified';
        res.status(400).send(error);
        throw new Error(error);
      }
      if (
        isNaN(req.query.height as unknown as number) ||
        isNaN(parseInt(req.query.height as string))
      ) {
        const error = 'Invalid Height Specified';
        res.status(400).send(error);
        throw new Error(error);
      }
      await rs.createResizedFile(
        req.query.fileName as string,
        parseInt(req.query.width as string) as number,
        parseInt(req.query.height as string) as number,
        next,
        req.query.fileType as string as FileType
      );
    } catch (err) {
      next(err);
    }
  },
  // return the appropriate image
  (req: express.Request, res: express.Response) => {
    res.sendFile(
      `${process.cwd()}/assets/lib/${req.query.fileName}-${req.query.width}-${
        req.query.height
      }.${req.query.fileType || 'jpeg'}`
    );
  }
);

export default router;
