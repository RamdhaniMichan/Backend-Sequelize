const express = require("express");

const routes = express.Router();
const controller = require("../Controllers/category");
const validate = require("../Middleware/validate");

routes.get("/", validate(["admin"]), controller.get);
routes.get("/commit", validate(["admin"]), controller.commit);
routes.get("/drop", validate(["admin"]), controller.drop);
routes.post("/", validate(["admin"]), controller.add);
routes.put("/", validate(["admigetn"]), controller.update);
routes.delete("/:id", validate(["admin"]), controller.del);

module.exports = routes;
