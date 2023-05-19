import { Router } from "express";
import uploader from "../services/upload.js";
import productsController from "../controllers/products.controller.js";

const router = Router();

router.get("/", productsController.getProducts);

router.post("/", uploader.single("Imgurl"), productsController.createProduct);

export default router;
