const express = require("express");

const routes = express.Router();
const controller = require("../Controllers/history");
const validate = require("../Middleware/validate");

routes.get("/commit", validate(["admin"]), controller.commit);
routes.get("/drop", validate(["admin"]), controller.drop);
routes.get("/", validate(["admin"]), controller.get);
routes.post("/", validate(["admin"]), controller.add);
routes.delete("/:id", controller.del);

module.exports = routes;
