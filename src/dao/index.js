import UserDao from "./mongo/UserDAO.js";
import ProductDao from "./mongo/ProductsDAO.js";
import CartDao from "./mongo/CartDAO.js";
import TicketsDAO from "./mongo/TicketsDAO.js";
import HistoriesDAO from "./mongo/HistoriesDAO.js"


export const userService = new UserDao();
export const productService = new ProductDao();
export const cartService = new CartDao();
export const ticketService = new TicketsDAO();
export const historiesService = new HistoriesDAO();