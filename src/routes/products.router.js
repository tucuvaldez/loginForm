import { Router } from "express";
import productModel from "../models/Products.js";
import { soloAdmins } from "../utilities/adminMiddleware.js";

const router = Router();

// router.get("/", async (req, res) => {
//   let products = await productModel.find();
//   res.send(JSON.stringify(products));
// });
router.get("/:id", async (req, res) => {
  //Get by Id
  let id = req.body.id;
  console.log(id);
  let producto = await productModel.findById(id);
  if (producto) {
    console.log(producto);
    // res.render("productos", { product: producto });
  } else {
    res.status(404).send("ID not found");
  }
});
router.post("/", soloAdmins, async (req, res) => {
  // Post new product
  let product = req.body;
  if (product) {
    try {
      product = await productModel.saveProduct(product);
      res.json({
        product_new: product,
        product_id: product.id,
      });
    } catch (error) {
      res.status(400).send(`${error}`);
    }
  } else {
    res.status(404).send("Product not found");
  }
});
router.put("/:id", soloAdmins, async (req, res) => {
  // Put(Update) product
  let product = await productModel.getById(req.params.id);
  if (product && req.body.id === product.id) {
    try {
      let response = productModel.updateProduct(req.body, req.params.id);
      res.json({
        product_old: product,
        product_new: req.body,
        finished: response,
      });
    } catch (error) {
      res.status(error).send("Invalid Product");
    }
  } else {
    res.status(404).send("ID not found");
  }
});
router.delete("/:id", soloAdmins, async (req, res) => {
  // Delete by Id
  let removed = await productModel.getById(req.params.id);
  if (removed) {
    await productModel.deleteById(req.params.id);
    res.json(removed);
  } else {
    res.status(404).send("ID not found");
  }
});

export default router;
