// import cartModel from "../../models/cartSchema.js";
// // import MongoContainer from "./MongoContainer.js";

// class MongoCarts {
//   constructor() {
//     cartModel;
//   }

//   async saveCart(cart) {
//     let response = await cartModel.create(cart);
//     return response;
//   }
//   async updateCart(id, product_list) {
//     console.log(id);
//     console.log(product_list);
//     let response = await cartModel.updateOne(
//       { _id: id },
//       { products: product_list }
//     );
//     return response;
//   }
//   async addtoCart(cartId, product) {
//     let cart = await cartModel.find({ _id: cartId });
//     let response = await cartModel.find(
//       { _id: cartId },
//       { cart: cart.products.push(product) }
//     );
//     return response;
//   }
//   async deleteCartProduct(cart, product) {
//     cart.products = cart.products.filter(
//       (e) => e._id.toString() !== product._id.toString()
//     );
//     let response = await cartModel.updateCart(cart._id, cart.products);
//     return response;
//   }
// }

// export default MongoCarts;
