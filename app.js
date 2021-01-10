require("dotenv/config");
const express = require("express");

const app = express();
const bodyPars = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");
const routes = require("./src/main");
// const db = require("./src/Config/db").sequelize;
const redis = require("./src/Config/redis");

const myformat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: myformat,
    }),
    new winston.transports.File({ filename: "file-logger.log" }),
  ],
});

app.use(morgan("dev"));
app.use(cors());
app.use(bodyPars.urlencoded({ extended: false }));
app.use(bodyPars.json());
app.use(routes);
app.use("/upload", express.static("upload"));

// db.connect()
//   .then(logger.log("info", "Database Connect"))
//   .catch((err) => logger.log("error", "Database Not Connect", err));

redis
  .redisCheck()
  .then((res) => {
    logger.log("info", res);
  })
  .catch((err) => {
    console.log("error", err);
  });

app.listen(8081, () => {
  logger.log("info", "Server running on port http://localhost:8081");
});
