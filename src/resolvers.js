import { productService, userService } from "./dao/index.js";

const resolvers = {
  Query: {
    getProducts: async () => {
      const products = await productService.getProducts();
      return products.docs;
    },
    getUsers: async () => {
      const users = await userService.getUsers();
      return users;
    },
  },
};

export default resolvers;
