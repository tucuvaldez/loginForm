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

const app = express();
const CPUs = os.cpus().length;
const PORT = process.env.PORT || 5000;
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

if (cluster.isPrimary) {
  console.log(
    `Proceso primario en PID: ${process.pid}. Generando procesos hijos`
  );
  for (let i = 0; i < CPUs; i++) {
    cluster.fork();
  }
  // cluster.on("exit", (worker) => {
  //   cluster.fork();
  // });
} else {
  console.log(`Proceso worker en PID: ${process.pid}`);
  app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}`);
  });
}
