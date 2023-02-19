import { Router } from "express";
import passport from "passport";
import userModel from "../models/User.js";
import { createHash, validatePassword } from "../utils.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !email || !password)
    return res
      .status(400)
      .send({ status: "error", success: false, error: "Valores incompletos" });
  const exists = await userModel.findOne({ email });
  if (exists)
    return res
      .status(400)
      .send({ status: "error", success: false, error: "El usuario ya existe" });
  const hashedPassword = await createHash(password);
  const result = await userModel.create({
    first_name,
    last_name,
    email,
    password: hashedPassword,
  });
  res.send({ status: "success", success: true, payload: result });
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/loginFail",
    failureMessage: true,
  }),
  async (req, res) => {
    const user = req.user;
    req.session.user = {
      id: user._id,
      name: user.first_name,
      email: user.email,
      role: user.role,
    };
    res.send({ status: "success", success: true, message: "Estas Logueado" });
  }
);

router.get("/logout", async (req, res) => {
  const user = req.session.user;
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(400).send({
          status: "error",
          succes: false,
          message: "El deslogueo ha fallado",
        });
      } else {
        res.render("logout", {
          user: user,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/loginFail", (req, res) => {
  console.log(req.session.messages);
  if (req.session.messages.length > 3)
    return res.status(400).send({ message: "Bloquear intentos" });
  res.status(400).send({ status: "error", error: "Error de autenticacion" });
});

router.get("/github", passport.authenticate("github"), (req, res) => {});

router.get("/githubcallBack", passport.authenticate("github"), (req, res) => {
  const user = req.user;
  req.session.user = {
    id: user._id,
    name: user.first_name,
    email: user.email,
    role: user.role,
  };
  // res.send({
  //   status: "success",
  //   success: true,
  //   message: "Logueado con Github",
  // });
  res.render("home", { user: req.session.user });
});

router.post("/logintoken", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user)
    return res.send({ status: "error", error: "Credenciales invalidas" });
  const isValidPassword = await validatePassword(password, user.password);
  if (!isValidPassword)
    return res
      .status(400)
      .send({ status: "error", error: "Contraseña inválida" });
  const tokenizedUser = {
    name: `${user.first_name} ${user.last_name}`,
    role: user.role,
    email: user.email,
  };
  const token = jwt.sign(tokenizedUser, "Clav3S3cre3ta", { expiresIn: "1d" });
  res.send({ status: "success", success: true, message: "Logueado", token });
});

router.get("/current", (req, res) => {
  const { token } = req.query;
  const user = jwt.verify(token, "Clav3S3cre3ta");
  console.log(user);
  res.send({ status: "success", payload: user });
});

export default router;
