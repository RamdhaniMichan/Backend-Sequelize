const express = require("express");

const routes = express.Router();
const controller = require("../Controllers/users");
const validate = require("../Middleware/validate");

routes.get("/commit", validate(["admin"]), controller.commit);
routes.get("/drop", validate(["admin"]), controller.drop);
routes.get("/", validate(["admin"]), controller.getAll);
routes.get("/", validate(["admin"]), controller.getEmail);
routes.post("/", validate(["admin"]), controller.add);
routes.put("/", validate(["admin"]), controller.update);
routes.delete("/:id", validate(["admin"]), controller.del);

module.exports = routes;
