import cartModel from "./cartSchema.js";

export default class CartDAO {
  getCartBy = (params) => {
    return cartModel.findOne(params).lean();
  };

  createCart = (params) => {
    if(!params.products){
        params.products = []
    }
    return cartModel.create(params);
  };
}
