// import mongoose from "mongoose";

// export class MongoContainer {
//   constructor(collection, schema) {
//     this.collection = mongoose.model(collection, schema);
//   }
//   async getAll() {
//     let response = await this.collection.find({});
//     return response;
//   }
//   async getById(id) {
//     let response = await this.collection.find({ _id: id });
//     return response;
//   }
//   async deleteById(id) {
//     try {
//       await this.collection.deleteOne({ _id: id });
//     } catch (err) {
//       throw new Error(err.message);
//     }
//   }
// }

// export default MongoContainer;
