import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
// import route from "../routes/routes";
import morgan from "morgan";
import { errorHandler } from "../Middlewares/errorhandler";
import { AppError, HttpCode } from "../Utils/AppError";

export default function appConfig(app: Application) {
  app
    .use(express.json())
    .use(cors())
    .use(morgan("dev"))

    // router configuration
    // .use("/api", route);
    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new AppError({
          message: `This route ${req.originalUrl} does not exist`,
          httpCode: HttpCode.NOT_FOUND,
          isOperational: true,
        })
      );
    })

    // error handlers; note: it should be the last middleware in your app.
    .use(errorHandler);
}
