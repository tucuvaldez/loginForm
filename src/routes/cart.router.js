import MongoCarts from "../public/js/MongoCarts.js";
import { Router } from "express";
import cartModel from "../models/cartSchema.js";

const carritosApi = new MongoCarts();

// Cart Router Settings
const router = Router();

router.get("/", async (req, res) => {
  let carts = await cartModel.find();
  if (carts) {
    res.json(carts);
  } else {
    res.status(400).send("Error on get");
  }
});
router.get("/:id", async (req, res) => {
  let cart = await cartModel.findById(req.params.id);
  console.log(cart);
  res.json(cart);
});
router.post("/", async (req, res) => {
  let cart = {
    products: Object.keys(req.body).length === 0 ? [] : req.body,
    owner: req.session.user.email,
  };
  // let cart = Object.keys(req.body).length === 0 ? [] : req.body;
  // let owner = req.session.user;
  let response = await cartModel.saveCart(cart);
  res.json({ new_cart: cart, response: response });
  console.log(owner);
});
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let cartDeleted = await cartModel.findById(id);
    console.log(prodToDelete);
    await cartModel.deleteById(id);
    res.json({ cart_deleted: cartDeleted[0] });
  } catch (error) {
    res.status(400).send(`${error}`);
  }
});
router.get("/:id/productos", async (req, res) => {
  let cart = await cartModel.findById(req.params.id);
  cart ? res.json({ products: cart }) : res.status(404).send("ID not found");
});
router.post("/:id/productos", async (req, res) => {
  let body = req.body;
  let product = await productosApi.findById(body.id);
  let cart = await cartModel.findById(req.params.id);

  if (cart && product) {
    cart[0].products.push(product[0]);
    await cartModel.updateCart(req.params.id, cart[0].products);
    res.json({
      new_product: product,
      on_cart: cart,
    });
  } else {
    res.status(404).send("Cart ID or Product ID not found");
  }
});
router.delete("/:id/productos/:id_prod", async (req, res) => {
  let cart = await cartModel.findById(req.params.id);
  cart = cart[0];
  let product = await productosApi.findById(req.params.id_prod);
  product = product[0];

  cart
    ? product
      ? cart.products.find(
          (element) => element._id.toString() === product._id.toString()
        )
        ? (await cartModel.deleteCartProduct(cart, product),
          res.json({ deleted_product: product }))
        : res.status(404).send("Product is not in cart")
      : res.status(404).send("Product ID not found")
    : res.status(404).send("Cart ID not found");
});

export default router;
