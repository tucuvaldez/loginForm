import express from "express";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
// import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js";
import mongoose from "mongoose";
import passport from "passport";
import initializeStrategies from "./config/passport.config.js";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import { addLogger } from "./middlewares/logger.js";
import handlebars from "express-handlebars";

const app = express();
const PORT = process.env.PORT || 8080;

const connection = mongoose.connect(config.mongo.URL);

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializeStrategies();

//Logeer
app.use(addLogger);

//Routers
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/productos", productsRouter);
// app.use("/api/carritos", cartRouter);

console.log(`Proceso worker en PID: ${process.pid}`);
app.listen(PORT, () =>
  console.log(`Listening on port: http://localhost:${PORT}`)
);
