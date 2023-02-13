import { Router } from "express";
import { getUsers, login, register } from "../controller/function";

const route = Router();

route.route("/post").post(register);
route.route("/getall").get(getUsers);
route.route("/login").post(login);

export default route;
