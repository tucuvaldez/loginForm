import { Router } from "express";
import cartModel from "../models/cartSchema.js";
import productModel from "../models/Products.js";
import viewsController from "../controllers/views.controller.js";

const router = Router();

router.get("/", viewsController.register);

router.get("/login", viewsController.login);

router.get("/home", viewsController.home);

router.get("/productos", viewsController.productos);

router.get("/productos/:id", async (req, res) => {
  // Get by Id
  // let id = req.body._id;
  // console.log(id);
  // let producto = await productModel.findById();
  // console.log(producto);
  let producto = await productModel.find();
  console.log(producto);
  let id = req.body.id;
  if (producto) {
    console.log(id);
    // res.render(`/productos/${id}`, { product: producto });
  } else {
    res.status(404).send("ID not found");
  }
});

router.get("/cart", viewsController.cart);

router.get("/logout", viewsController.logout);

router.get("/info", (req, res) => {
  res.json({
    server: {
      "Directorio actual de trabajo ": process.cwd(),
      "Id del proceso": process.pid,
      "Version de Node": process.version,
      "Titulo del proceso": process.title,
      "Sistema operativo": process.platform,
      "Uso de la Memoria": process.memoryUsage(),
    },
  });
});
export default router;
