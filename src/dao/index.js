import UserDao from "./mongo/models/UserDAO.js";
import ProductDao from "./mongo/models/ProductsDAO.js";
import CartDao from "./mongo/models/CartDAO.js";

export const userService = new UserDao();
export const productService = new ProductDao();
export const cartService = new CartDao();
