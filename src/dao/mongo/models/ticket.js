import mongoose from "mongoose";

const collection = "Tickets";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
    products: [
      {
        _id: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Products",
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      unique: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ticketModel = mongoose.model(collection, schema);

export default ticketModel;
