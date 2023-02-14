import { Router } from "express";
import userModel from "../models/User.js";

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
  const result = await userModel.create({
    first_name,
    last_name,
    email,
    password,
  });
  res.send({ status: "success", success: true, payload: result });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({
      status: "error",
      success: false,
      message: "Valores incompletos",
    });
  const user = await userModel.findOne({ email, password });
  if (!user) {
    return res.status(400).send({
      status: "error",
      success: false,
      message: "Correo o contraseña invalido",
    });
  }
  req.session.user = {
    id: user._id,
    name: user.first_name,
    email: user.email,
    role: user.role,
  };
  res.send({ status: "success", success: true, message: "Estas Logueado" });
});

router.post("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(400).send({
        status: "error",
        succes: false,
        message: "El deslogueo ha fallado",
      });
    } else {
      res.send({
        status: "success",
        success: true,
        message: "Te has deslogueado",
      });
    }
  });
});

export default router;
