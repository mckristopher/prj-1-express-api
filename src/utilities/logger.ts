import express from 'express';

function logger(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  console.log(
    `endpoint visited : \n${req.url}  \nparams : \n${JSON.stringify(req.query)}`
  );
  next();
}

export default logger;
