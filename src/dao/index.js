import UserDao from "./mongo/UserDAO.js";
import ProductDao from "./mongo/ProductsDAO.js";
import CartDao from "./mongo/CartDAO.js";

export const userService = new UserDao();
export const productService = new ProductDao();
export const cartService = new CartDao();
