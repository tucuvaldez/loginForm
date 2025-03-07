//Importo dependencias
import mongoose from "mongoose";

const collection = "Carts";
//Definimos el schema del documento y modelo para interactuar con la base de datos
const schema = new mongoose.Schema({
  products: [
    {
      _id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Products",
      },
      quantity: { type: Number, ref: "Quantity" },
    },
  ],
  owner: { type: String, required: true },
});

const cartModel = mongoose.model(collection, schema);
export default cartModel;
