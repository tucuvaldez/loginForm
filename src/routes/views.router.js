import { Router } from "express";
import productModel from "../models/Products.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/home", async (req, res) => {
  const loggedIn = req.session.user;
  const products = await productModel.find();
  debugger;
  req.session.cookie.expires = new Date(Date.now() + 300000);
  if (loggedIn) {
    res.render("home", { user: loggedIn, product: products });
  } else {
    res.redirect("login");
  }
});

router.get("/productos", async (req, res) => {
  let producto = await productModel.find();
  // req.session.cookie.expires = new Date(Date.now() + 300000);
  if (producto) {
    res.render("productos", { product: producto });
  } else {
    res.redirect("/login");
  }
});

router.get("/logout", (req, res) => {
  res.render("logout");
});

router.get("/info", (req, res) => {
  res.json({
    server: {
      "Directorio actual de trabajo ": process.cwd(),
      "Id del proceso": process.pid,
      "Version de Node": process.version,
      "Titulo del proceso": process.title,
      "Sistema operativo": process.platform,
      "Uso de la Memoria": process.memoryUsage(),
    },
  });
});
export default router;
