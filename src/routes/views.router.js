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
export default router;
