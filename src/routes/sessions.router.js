import { Router } from "express";
import passport from "passport";
import uploader from "../services/upload.js";
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
    session: false,
  }),
  sessionsController.login
);

router.get("/logout", sessionsController.logout);

router.get("/loginFail", sessionsController.loginFail);

router.get("/github", passport.authenticate("github"), (req, res) => {});

router.get(
  "/githubcallBack",
  passport.authenticate("github", { session: false }),
  sessionsController.github
);

router.post("/logintoken", sessionsController.logintoken);

export default router;
