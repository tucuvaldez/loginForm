import dotenv from "dotenv";

dotenv.config();
export default {
  //   app: {
  //     PORT: process.env.PORT || 8000,
  //   },
  mongo: {
    MONGO_URL: process.env.MONGO_URL,
  },
  jwt: {
    SECRET: process.env.JWT_SECRET,
  },
  session: {
    SECRET: process.env.SESSION_SECRET
  }
};
