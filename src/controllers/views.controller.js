import cartModel from "../models/cartSchema.js";
import productModel from "../models/Products.js";

const register = (req, res) => {
  res.render("register");
};

const login = (req, res) => {
  res.render("login");
};

const home = async (req, res) => {
  const loggedIn = req.session.user;
  const products = await productModel.find();
  // req.session.cookie.expires = new Date(Date.now() + 300000);
  if (loggedIn) {
    res.render("home", { user: loggedIn, product: products });
  } else {
    res.redirect("login");
  }
};

const productos = async (req, res) => {
  const loggedIn = req.session.user;
  let products = await productModel.find().lean();
  let cart = loggedIn.cart;

  if (loggedIn) {
    res.render("productos", { product: products, user: loggedIn, cart: cart });
  } else {
    res.redirect("/login");
  }
};

const logout = (req, res) => {
  res.render("logout");
};

const cart = async (req, res) => {
  let user = req.session.user;
  let cart = await cartModel.find();
  console.log(cart);
  res.render("cart", { cart: cart[0], user });
};

export default {
  register,
  login,
  home,
  productos,
  logout,
  cart,
};
