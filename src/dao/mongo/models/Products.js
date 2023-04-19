import mongoose from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";

const collection = "Products";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  Imgurl: { type: String },
});
schema.plugin(mongoosePagination);

const productModel = mongoose.model(collection, schema);
export default productModel;
