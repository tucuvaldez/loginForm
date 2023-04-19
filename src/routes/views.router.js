import { Router } from "express";
// import cartModel from "../models/cartSchema.js";
import productModel from "../dao/mongo/models/Products.js";
import viewsController from "../controllers/views.controller.js";
import { executePolicies } from "../middlewares/auth.js";

const router = Router();

router.get("/", viewsController.register);

router.get("/login", viewsController.login);

router.get("/home", executePolicies(["USER"]), viewsController.home);

router.get("/productos", executePolicies(["USER"]), viewsController.productos);

router.get(
  "/profile",
  executePolicies(["AUTHENTICATED"]),
  viewsController.profile
);

router.get("/cart", executePolicies(["USER"]), viewsController.cart);

export default router;
