import winston from "winston";

//Levels
const levelOptions = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
  },
};
//Logger
const logger = winston.createLogger({
  levels: levelOptions.levels,
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "./error.log", level: "error" }),
    new winston.transports.File({ filename: "./warn.log", level: "warn" }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = logger;
  next();
};
