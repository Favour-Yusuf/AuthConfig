import { Router } from "express";
import { createProduct, getProduct } from "../Controller/products.controller";
// import { getProduct, createProduct } from "../controllers/products.controller";

const router = Router();

router.route("/").get(getProduct);
router.route("/create").post(createProduct);

export default router;
