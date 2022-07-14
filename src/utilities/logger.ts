import express from 'express';

function logger(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log(
    `${req.url} was visited with params : \n${JSON.stringify(req.query)}`
  );
  next();
}

export default logger;
