import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mongoose from "mongoose";
import passport from "passport";
import initializeStrategies from "./config/passport.config.js";
import config from "./config/config.js";
import { minimistconfig } from "./config/minimist.js";
import cluster from "cluster";
import os from "os";
import compression from "express-compression";
import { logger } from "./middleware/logger.js";

const app = express();
const CPUs = os.cpus().length;
const PORT = minimistconfig.port || 8080;

if (cluster.isPrimary && minimistconfig.mode.toLowerCase() === "cluster") {
  try {
    console.log(
      `Servidor levantado. PORT: ${minimistconfig.port} - Server mode: ${minimistconfig.mode}`
    );
    for (let i = 0; i < CPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker) => {
      cluster.fork();
    });
  } catch (err) {
    console.log(err);
  }
} else {
  mongoose.set("strictQuery", false);
  const connection = mongoose.connect(config.mongo.MONGO_URL);
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: config.mongo.MONGO_URL,
        ttl: 60,
      }),
      secret: config.session.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 30000 },
    })
  );
  initializeStrategies();
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(compression());
  //Antes de la compresion la pagina /info tenia 600B y despues sólo 1.3kB

  //Inicializar el motor
  app.engine("handlebars", handlebars.engine());
  app.set("views", `${__dirname}/views`);
  app.set("view engine", "handlebars");

  app.use(express.static(`${__dirname}/public`));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //Routers
  app.use("/", viewsRouter);
  app.use("/api/sessions", sessionsRouter);

  //prueba de logger

  app.get("/test", (req, res) => {
    logger.log("silly", "yes");
    logger.log("debug", "yes debug");
    logger.log("verbose", "hola verbose");
    logger.log("http", "http");
    logger.log("info", "hola info");
    logger.log("warn", "warnn");
    logger.log("error", "bad");
    res.send("test funcionando");
  });

  console.log(`Proceso worker en PID: ${process.pid}`);
  app.listen(minimistconfig.port, () => {
    console.log(`Listening on port: http://localhost:${minimistconfig.port}`);
  });
}
