import { checkProduct } from "../../utilities/utilities.js";
import productModel from "../../models/Products.js";
// import MongoContainer from "./MongoContainer.js";

class MongoProducts {
  constructor() {
    productModel;
  }
  async saveProduct(product) {
    if (product.id) {
      delete product.id;
    }
    if (checkProduct(product)) {
      let response = productModel.create(product);
      return response;
    }
    throw new Error("Invalid Product");
  }
  async updateProduct(product, productId) {
    let response = productModel.updateOne({ _id: productId }, product);
    if (product) {
      return response;
    } else {
      throw new Error(400);
    }
  }
}

export default MongoProducts;
