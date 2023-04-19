import { cartService } from "../dao/index.js";
const insertProdToCart = async (req, res) => {
  const owner = req.user.email;
  const prodId = req.params.pid;
  const cart = await cartService.getCartBy({ owner });
  const exists = cart.products.find((prod) => prod._id.toString() === prodId);
  if (exists)
    return res
      .status(400)
      .send({ status: "error", error: "Product already in cart" });
  cart.products.push({ _id: prodId });

  await cartService.updateCart(cart._id, { products: cart.products });

  res.redirect("/cart");
};

export default { insertProdToCart };
