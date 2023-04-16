import cartModel from "../dao/mongo/models/cartSchema.js";
import { cartService, productService, userService } from "../dao/index.js";

const register = (req, res) => {
  res.render("register");
};

const login = (req, res) => {
  res.render("login");
};

const home = async (req, res) => {
  let cart = await cartService.getCartBy({ owner: req.user.email });
  const products = await productService.getProducts();
  if (!cart) {
    cart = cartService.createCart({ owner: req.user.email });
  }
  req.user.cart = cart;
  res.render("home", { user: req.user, product: products });
};
const profile = (req, res) => {
  res.render("profile", { user: req.user });
};

const productos = async (req, res) => {
  let products = await productService.getProducts();
  res.render("productos", { user: req.user, product: products });
};

const logout = (req, res) => {
  res.render("logout");
};

const cart = async (req, res) => {
  let user = req.user;
  let cart = await cartService.getCartBy({ owner: user.email });
  console.log(cart);
  res.render("cart", { cart: cart, user: user });
};

export default {
  register,
  login,
  home,
  productos,
  logout,
  cart,
  profile,
};
