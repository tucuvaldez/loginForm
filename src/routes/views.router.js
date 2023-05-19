import { Router } from "express";
import viewsController from "../controllers/views.controller.js";
import { executePolicies } from "../middlewares/auth.js";

const router = Router();

router.get("/", viewsController.register);

router.get("/login", viewsController.login);

router.get("/home", executePolicies(["USER"]), viewsController.home);

router.get(
  "/products",
  executePolicies(["AUTHENTICATED"]),
  viewsController.products
);

router.get(
  "/profile",
  executePolicies(["AUTHENTICATED"]),
  viewsController.profile
);

router.get("/cart", executePolicies(["USER"]), viewsController.cart);

export default router;
