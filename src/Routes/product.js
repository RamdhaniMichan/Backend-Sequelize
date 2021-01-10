const express = require("express");

const routes = express.Router();
const controller = require("../Controllers/product");
const upload = require("../Middleware/multer");
const cache = require("../Middleware/cache");
const validate = require("../Middleware/validate");

routes.get("/commit", validate(["admin"]), controller.commit);
routes.get("/drop", validate(["admin"]), controller.drop);
routes.get("/", validate(["admin", "user"]), cache, controller.get);
routes.get("/find", validate(["admin", "user"]), controller.findBy);
routes.post("/", validate(["admin"]), upload.single("image"), controller.add);
routes.put("/", validate(["admin"]), upload.single("image"), controller.update);
routes.delete("/:id", validate(["admin"]), controller.del);

module.exports = routes;
