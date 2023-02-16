import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler";
import userModel from "../Model/shema";
import { AppError, HttpCode } from "../utils/AppError";
import { IData } from "../Interface/user.interface";
import { loginValidaton, userDataValidation } from "../Utils/validation";

export const register = asyncHandler(
  async (
    req: Request<{}, {}, IData>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name, email, password } = req.body || {};

    const validation = userDataValidation(req.body);
    console.log(validation);
    if (validation.error) {
      next(
        new AppError({
          message: "Enter complete fields",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }
    const salt: string = await bcrypt.genSalt(12);
    const hashed: string = await bcrypt.hash(password, salt);

    const user = await userModel.create({ name, email, password: hashed });
    if (!user) {
      next(
        new AppError({
          message: "Account not Created",
          httpCode: HttpCode.BAD_REQUEST,
          isOperational: true,
        })
      );
    }
    return res.status(200).json({
      user,
    });
  }
);

export const login = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email, password } = req.body;
    const Validation = loginValidaton({ email, password });
    if (Validation) {
      next(
        new AppError({
          message: "Enter complete fields",
          httpCode: HttpCode.UNAUTHORIZED,
        })
      );
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      next(
        new AppError({
          message: "User not found",
          httpCode: HttpCode.NOT_FOUND,
          isOperational: true,
        })
      );
    }
    const checkpass = await bcrypt.compare(password, user!.password);
    if (!checkpass) {
      next(
        new AppError({
          message: "Email or password not correct",
          httpCode: HttpCode.UNAUTHORIZED,
          isOperational: true,
        })
      );
    }

    return res.status(200).json({ message: `Welcome ${user!.fullName}` });
  }
);

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await userModel.find();
    return res.status(200).json({
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
