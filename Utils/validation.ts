import Joi from "joi";
import { IData } from "../Interface/user.interface";

export const userDataValidation = (user: IData) => {
  const userShema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
  });

  return userShema.validate(user);
};

export const loginValidaton = (login: { email: string; password: string }) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
  });

  return loginSchema.validate(login);
};
