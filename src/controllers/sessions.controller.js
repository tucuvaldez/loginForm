import productModel from "../models/Products.js";
import transporter from "../middleware/nodemailer.js";
import cartModel from "../models/cartSchema.js";
import { createHash } from "../utils.js";
import userModel from "../models/User.js";
import { validatePassword } from "../utils.js";

const register = async (req, res) => {
  const file = req.file;
  const { first_name, last_name, email, password, address, age, phone } =
    req.body;
  if (!first_name || !email || !password || !address || !age || !phone) {
    req.logger.warn("Faltan campos por completar");
    return res
      .status(400)
      .send({ status: "error", success: false, error: "Valores incompletos" });
  }
  const exists = await userModel.findOne({ email });
  if (exists) {
    req.logger.warn("El usuario ya está registrado");
    return res
      .status(400)
      .send({ status: "error", success: false, error: "El usuario ya existe" });
  }
  const hashedPassword = await createHash(password);
  const result = await userModel.create({
    first_name,
    last_name,
    email,
    age,
    address,
    phone,
    password: hashedPassword,
    avatar: `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`,
  });
  req.logger.info(`El usuario ${result.first_name} fue registrado con éxito `);
  res.send({ status: "success", success: true, payload: result });
  let resultMail = await transporter.sendMail({
    from: "Wine not? <ricvaldezmadegmail.com",
    to: email,
    subject: "Registro en Wine not?",
    html: `<div><h1>Fuiste registrado con exito, muchas gracias!</h1></div>`,
    attachments: [
      {
        filename: "Perrito.jpg",
        path: "./src/public/img/perrito.jpg",
      },
    ],
  });
  console.log(resultMail);
};

const login = async (req, res) => {
  const user = req.user;
  const cart = await cartModel.findOne({ owner: user.email });
  req.session.user = {
    id: user._id,
    name: user.first_name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    cart: cart,
  };
  req.logger.info(`El usuario ${user.first_name} fue logueado con éxito`);
  res.send({ status: "success", success: true, message: "Estas Logueado" });
};

const loginFail = (req, res) => {
  console.log(req.session.messages);
  if (req.session.messages.length > 3) {
    req.logger.error(`Bloquear intentos de logueo`);
    return res.status(400).send({ message: "Bloquear intentos" });
  }
  res.status(400).send({ status: "error", error: "Error de autenticacion" });
};

const logout = async (req, res) => {
  const user = req.session.user;
  try {
    req.session.destroy((err) => {
      if (err) {
        req.logger.error("Error al desloguearse");
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
};

const github = (req, res) => {
  const user = req.user;
  req.session.user = {
    id: user._id,
    name: user.first_name,
    email: user.email,
    role: user.role,
  };

  res.render("home", { user: req.session.user });
};

const logintoken = async (req, res) => {
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
  const token = jwt.sign(tokenizedUser, config.jwt.SECRET, { expiresIn: "1d" });
  res.send({ status: "success", success: true, message: "Logueado", token });
};

const google = async (req, res) => {
  const user = req.user;
  req.session.user = { id: user.id, email: user.email, role: user.role };
  res.send({
    status: "success",
    payload: user,
    message: "Logueado con google",
  });
};

export default {
  register,
  login,
  loginFail,
  logout,
  github,
  logintoken,
  google,
};
