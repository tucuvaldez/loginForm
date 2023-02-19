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

const app = express();
const PORT = process.env.PORT || 8080;
mongoose.set("strictQuery", false);
const connection = mongoose.connect(
  "mongodb+srv://admin:1234@login.atwudct.mongodb.net/comision31840?retryWrites=true&w=majority"
);
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://admin:1234@login.atwudct.mongodb.net/comision31840?retryWrites=true&w=majority`,
      ttl: 60,
    }),
    secret: "secretWord4321",
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

app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT} 
`);
});
