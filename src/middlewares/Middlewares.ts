import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
// import { ExtendableError } from "ts-error";

dotenv.config();

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not found!!: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//Errorhandler middleware to our application
// eslint-disable-next-line @typescript-eslint/no-unused-vars

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  const statuscode: number = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statuscode);
  res.json({
    statuscode: statuscode,
    message: error.message,
    staktrace: process.env.ENVIROMENT === "PRODUCTION" ? "lost" : error.stack,
  });
};

export default {
  notFound,
  errHandler,
};
