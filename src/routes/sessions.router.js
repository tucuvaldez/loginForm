import { Router } from "express";
import passport from "passport";

import jwt from "jsonwebtoken";
import uploader from "../config/upload.js";
import sessionsController from "../controllers/sessions.controller.js";

const router = Router();

router.post(
  "/register",
  uploader.single("avatar"),
  sessionsController.register
);

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/loginFail",
    failureMessage: true,
  }),
  sessionsController.login
);

router.get("/logout", sessionsController.logout);

router.get("/loginFail", sessionsController.loginFail);

router.get("/github", passport.authenticate("github"), (req, res) => {});

router.get(
  "/githubcallBack",
  passport.authenticate("github"),
  sessionsController.github
);

router.post("/logintoken", sessionsController.logintoken);

router.get("/current", (req, res) => {
  const { token } = req.query;
  const user = jwt.verify(token, config.jwt.SECRET);
  console.log(user);
  res.send({ status: "success", payload: user });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
  async (req, res) => {}
);
router.get(
  "/googlecallback",
  passport.authenticate("google"),
  sessionsController.google
);

router.get("/info", (req, res) => {
  res.json({
    server: {
      cwd: process.cwd(),
      id: process.pid,
      version: process.version,
      title: process.title,
      so: process.platform,
      memory: process.memoryUsage(),
    },
  });
});

export default router;
