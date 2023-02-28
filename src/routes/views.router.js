import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/home", (req, res) => {
  const loggedIn = req.session.user;
  req.session.cookie.expires = new Date(Date.now() + 30000);
  if (loggedIn) {
    res.render("home", { user: req.session.user });
  } else {
    res.redirect("login");
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
