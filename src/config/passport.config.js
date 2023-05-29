import passport from "passport";
import local from "passport-local";
import userModel from "../dao/mongo/models/User.js";
import { validatePassword } from "../services/auth.js";
import GithubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oidc";
import config from "./config.js";

const LocalStrategy = local.Strategy;

const initializeStrategies = () => {
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        if (
          email === config.app.ADMIN_USER &&
          password === config.app.ADMIN_PWD
        ) {
          //Significa que entró con las credenciales de superadmin
          return done(null, { _id: 0, name: "Admin", role: "admin" });
        }
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

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.5abc028981e2bf9f",
        clientSecret: "0cff878b8f0f4f5a43fee620d972bf3c2f7ff25a",
        callbackURL: "http://localhost:8080/api/sessions/githubcallBack",
      },
      async (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json;
        const user = await userModel.findOne({ email });
        if (!user) {
          const newUser = {
            first_name: name,
            email,
            password: "",
          };
          const result = await userModel.create(newUser);
          return done(null, result);
        }
        done(null, user);
      }
    )
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID:
          "324437827429-gpn8ane6oqvbetlhackt6ff43urn98uf.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/api/sessions/googlecallback",
      },
      async (issuer, profile, done) => {
        console.log(profile);
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const email = profile.emails[0].value;
        const user = await userModel.findOne({ email });
        if (!user) {
          //Si no existe lo registro
          const newUser = {
            first_name: firstName,
            last_name: lastName,
            email,
            password: "",
          };
          let result = await userModel.create(newUser);
          return done(null, result);
        } else {
          //Si existe, lo devuelvo
          return done(null, user);
        }
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
