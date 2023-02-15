import passport from "passport";
import local from "passport-local";
import userModel from "../models/User.js";
import { validatePassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializeStrategies = () => {
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        if (!email || !password)
          return done(null, false, { message: "Valores incompletos" });
        const user = await userModel.findOne({ email });
        if (!user)
          return done(null, false, { message: "Credenciales inválidas" });
        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword)
          return done(null, false, { message: "Contraseña inválida" });
        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const result = await userModel.findById({ _id: id });
    done(null, result);
  });
};

export default initializeStrategies;
