import cartsController from "../controllers/carts.controller.js";
import { Router } from "express";
import { executePolicies } from "../middlewares/auth.js";

const router = Router();

router.get(
  "/products/:pid",
  executePolicies(["USER"]),
  cartsController.insertProdToCart
);

export default router;