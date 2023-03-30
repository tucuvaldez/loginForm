import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  avatar: String,
});

const userModel = mongoose.model(collection, schema);
export default userModel;
