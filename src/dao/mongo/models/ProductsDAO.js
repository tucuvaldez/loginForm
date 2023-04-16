import productModel from "./Products.js";

export default class ProductDao {
  getProducts = (params) => {
    return productModel.find(params).lean();
  };

  createProduct = (product) => {
    return productModel.create(product);
  };
}
