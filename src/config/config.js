import dotenv from "dotenv";

dotenv.config();
export default {
  app: {
    ADMIN_USER: process.env.SUPERADMIN_EMAIL,
    ADMIN_PWD: process.env.SUPERADMIN_PASSWORD,
  },
  mongo: {
    MONGO_URL: process.env.MONGO_URL,
  },
  jwt: {
    SECRET: process.env.JWT_SECRET,
  },
  session: {
    SECRET: process.env.SESSION_SECRET,
  },
};
