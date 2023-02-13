import { NextFunction, Request, Response } from "express";
import { AppError } from "../Utils/AppError";

const devErrorHandler = (err: AppError, res: Response) => {
  res.status(err.httpCode).json({
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
};

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  devErrorHandler(err, res);
};
