import jwt from "jsonwebtoken";
import { createHash, validatePassword } from "../services/auth.js";
import config from "../config/config.js";
import UserDTO from "../dao/DTO/UserDTO.js";
import { userService } from "../dao/index.js";
import { addLogger } from "../middlewares/logger.js";

const register = async (req, res) => {
  try {
    const file = req.file;
    if (!file)
      return res
        .status(500)
        .send({ status: "error", error: "Error al cargar el archivo" });

    const { firstName, lastName, email, password, address, age, phone } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !address ||
      !age ||
      !phone
    )
      return res
        .status(400)
        .send({ status: "error", error: "Valores incompletos" });

    const exists = await userService.getUsersBy({ email });
    if (exists)
      return res
        .status(400)
        .send({ status: "error", error: "El usuario ya existe" });
    const hashedPassword = await createHash(password);
    const user = {
      firstName,
      lastName,
      email,
      age,
      address,
      phone,
      password: hashedPassword,
      avatar: `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`,
    };
    const result = await userService.createUser(user);

    res.send({
      status: "success",
      success: true,
      message: "Registrado",
      payload: result,
    });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Error del servidor" });
  }
};

const login = async (req, res) => {
  try {
    const userToken = UserDTO.getTokenDTO(req.user);
    const token = jwt.sign(userToken, config.jwt.SECRET, { expiresIn: "1d" });
    res.cookie(config.jwt.COOKIE, token).send({
      status: "success",
      success: true,
      message: "logged in",
      user: userToken,
    });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Error del servidor" });
  }
};

const loginFail = (req, res) => {
  res.send("Algo salió mal");
};

const logout = async (req, res) => {
  try {
    res.clearCookie(config.jwt.COOKIE).redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

const github = (req, res) => {
  try {
    const userToken = UserDTO.getTokenDTO(req.user);
    const token = jwt.sign(userToken, config.jwt.SECRET, { expiresIn: "1d" });
    res.cookie(config.jwt.COOKIE, token).redirect("/home");
  } catch (error) {
    res.status(500).send({ status: "error", error: "Error del servidor" });
  }
};

const logintoken = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUsers({ email });
  if (!user)
    return res.send({ status: "error", error: "Credenciales invalidas" });
  const isValidPassword = await validatePassword(password, user.password);
  if (!isValidPassword)
    return res
      .status(400)
      .send({ status: "error", error: "Contraseña inválida" });
  const tokenizedUser = {
    name: `${user.firstName} ${user.lastName}`,
    role: user.role,
    email: user.email,
  };
  const token = jwt.sign(tokenizedUser, config.jwt.SECRET, { expiresIn: "1d" });
  res.send({ status: "success", success: true, message: "Logueado", token });
};

// const google = async (req, res) => {
//   const user = req.user;
//   req.user = { id: user.id, email: user.email, role: user.role };
//   res.send({
//     status: "success",
//     payload: user,
//     message: "Logueado con google",
//   });
// };

export default {
  register,
  login,
  loginFail,
  logout,
  github,
  logintoken,
  // google,
};
