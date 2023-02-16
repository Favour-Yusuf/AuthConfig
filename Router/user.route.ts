import { Router } from "express";
import { getUsers, login, register } from "../Controller/user.controller";
import {
  loginValidation,
  registerValidation,
} from "../Validations/auth/userValidation";

const router = Router();

router.route("/").get(getUsers);
// parsing validation middlewares
router.route("/register").post(registerValidation, register);
router.route("/login").post(loginValidation, login);

export default router;
