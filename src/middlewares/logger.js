import winston from "winston";

//Logger
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/warn.log", level: "warn" }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = logger;
  next();
};
