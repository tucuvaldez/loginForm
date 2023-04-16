import { Router } from "express";
// import cartModel from "../models/cartSchema.js";
import productModel from "../dao/mongo/models/Products.js";
import viewsController from "../controllers/views.controller.js";
import { executePolicies } from "../middlewares/auth.js";

const router = Router();

router.get("/", viewsController.register);

router.get("/login", viewsController.login);

router.get("/home", executePolicies(["AUTHENTICATED"]), viewsController.home);

router.get(
  "/productos",
  executePolicies(["AUTHENTICATED"]),
  viewsController.productos
);

router.get(
  "/profile",
  executePolicies(["AUTHENTICATED"]),
  viewsController.profile
);

router.get("/cart", executePolicies(["AUTHENTICATED"]), viewsController.cart);

export default router;
