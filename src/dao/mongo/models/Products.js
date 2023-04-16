import mongoose from "mongoose";

const collection = "Products";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  Imgurl: { type: String },
});

const productModel = mongoose.model(collection, schema);
export default productModel;
