import productModel from "./models/Products.js";

export default class ProductDao {
  getProducts = (params, page) => {
    return productModel.paginate(params, { page, limit: 4, lean: true });
    //return productModel.find(params).lean();
  };

  getProductBy = (params) => {
    return productModel.find(params).lean();
  };

  createProduct = (product) => {
    return productModel.create(product);
  };
}
