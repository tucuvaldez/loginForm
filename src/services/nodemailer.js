import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.nodemailer.GMAIL_USER,
    pass: config.nodemailer.GMAIL_PWD,
  },
});

export default transporter;
