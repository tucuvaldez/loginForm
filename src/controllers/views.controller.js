import { cartService, productService } from "../dao/index.js";

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
  const page = req.query.page || 1;
  const owner = req.user.email;
  const pagination = await productService.getProducts({}, page);
  let products = pagination.docs;
  const cart = await cartService.getCartBy({ owner });
  products = products.map((product) => {
    const exists = cart.products.some(
      (p) => p._id.toString() === product._id.toString()
    );
    return { ...product, isValidToAdd: !exists };
  });
  const paginationData = {
    hasPrevPage: pagination.hasPrevPage,
    hasNextPage: pagination.hasNextPage,
    nextPage: pagination.nextPage,
    prevPage: pagination.prevPage,
    page: pagination.page,
  };
  console.log(paginationData.nextPage);
  res.render("productos", {
    user: req.user,
    product: products,
    paginationData,
    css: "products",
  });
};

const logout = (req, res) => {
  res.render("logout");
};

const cart = async (req, res) => {
  const owner = req.user;
  let cart = await cartService.getCartBy(
    {
      owner: owner.email,
    },
    { populate: true }
  );
  const products = cart.products.map((prod) => prod._id);
  res.render("cart", { cart, owner, products, css: "cart" });
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
