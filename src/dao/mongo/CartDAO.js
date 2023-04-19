import cartModel from "./models/cartSchema.js";

export default class CartDAO {
  getCartBy = (params, option = {}) => {
    if (option.populate)
      return cartModel.findOne(params).populate("products._id").lean();
    return cartModel.findOne(params).lean();
  };

  createCart = (params) => {
    if (!params.products) {
      params.products = [];
    }
    return cartModel.create(params);
  };

  updateCart = (id, cart) => {
    return cartModel.findByIdAndUpdate(id, { $set: cart });
  };
}
