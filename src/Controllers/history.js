const model = require("../Models/history");
const respon = require("../Helpers/respons");

class History {
  async commit(req, res) {
    try {
      const result = await model.commit();
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 500, error, true);
    }
  }

  async get(req, res) {
    try {
      const data = await model.get();
      return respon(res, 200, data);
    } catch (error) {
      return respon(res, 400, error);
    }
  }

  async add(req, res) {
    try {
      const data = await model.add(req.body);
      return respon(res, 200, data);
    } catch (error) {
      return respon(res, 400, error);
    }
  }

  async del(req, res) {
    try {
      const result = await model.destroy(req.params.id);
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 400, error);
    }
  }

  async drop(req, res) {
    try {
      const result = await model.drop();
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 500, error, true);
    }
  }
}

module.exports = new History();
