const model = require("../Models/product");
const respon = require("../Helpers/respons");
const cloadUpload = require("../Helpers/cloadUpload");
const { redisdb } = require("../Config/redis");

class Product {
  async commit(req, res) {
    try {
      const result = await model.commit();
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 500, error);
    }
  }

  async get(req, res) {
    try {
      const result = await model.get();
      const cache = JSON.stringify(result);
      redisdb.setex("product", 60, cache);
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 404, error);
    }
  }

  async findBy(req, res) {
    try {
      const data = {};
      let result = "";
      const { name, price, category } = req.query;

      if (name) {
        data.name = name;
      }
      if (price) {
        data.price = price;
      }
      if (category) {
        data.category = category;
      }

      if (Object.keys(data.length === 0)) {
        result = await model.get();
      } else {
        result = await model.findBy(data);
      }

      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 404, error);
    }
  }

  async add(req, res) {
    try {
      const {
        name, description, price, idcategory,
      } = req.body;
      if (name <= 0) {
        return respon(res, 500, { msg: "Name is required" });
      }
      if (description <= 0) {
        return respon(res, 500, { msg: "Description is required" });
      }
      if (price <= 0) {
        return respon(res, 500, { msg: "Price is required" });
      }
      if (req.file === undefined) {
        return respon(res, 500, { msg: "Image is required" });
      }
      if (idcategory <= 0) {
        return respon(res, 500, { msg: "Id Category is required" });
      }
      console.log(req.file.path);
      req.body.image = await cloadUpload(req.file.path);
      const result = await model.add(req.body);
      return respon(res, 201, result);
    } catch (error) {
      return respon(res, 404, error);
    }
  }

  async update(req, res) {
    try {
      const {
        id, name, description, price, idcategory,
      } = req.body;
      if (name <= 0) {
        return respon(res, 500, { msg: "Name is required" });
      }
      if (description <= 0) {
        return respon(res, 500, { msg: "Description is required" });
      }
      if (price <= 0) {
        return respon(res, 500, { msg: "Price is required" });
      }
      if (req.file === undefined) {
        return respon(res, 500, { msg: "Image is required" });
      }
      if (idcategory <= 0) {
        return respon(res, 500, { msg: "Id Category is required" });
      }

      req.body.image = await cloadUpload(req.file.path);
      const result = await model.update(req.body, id);
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 404, error);
    }
  }

  async del(req, res) {
    try {
      const result = await model.destroy(req.params.id);
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 404, error);
    }
  }

  async drop(req, res) {
    try {
      const result = await model.drop();
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 500, error);
    }
  }
}

module.exports = new Product();
