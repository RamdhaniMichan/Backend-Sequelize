const category = {};
const model = require("../Models/category");
const respon = require("../Helpers/respons");

category.commit = async (req, res) => {
  try {
    const result = await model.commit();
    return respon(res, 200, result);
  } catch (error) {
    return respon(res, 500, error, true);
  }
};

category.get = async (req, res) => {
  try {
    const result = await model.getAll();
    return respon(res, 200, result);
  } catch (error) {
    return respon(res, 400, error);
  }
};

category.add = async (req, res) => {
  try {
    const result = await model.add(req.body);
    return respon(res, 200, result);
  } catch (error) {
    return respon(res, 400, error);
  }
};

category.update = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await model.update(req.body, id);
    return respon(res, 200, result);
  } catch (error) {
    return respon(res, 400, error);
  }
};

category.del = async (req, res) => {
  try {
    const result = await model.del(req.params.id);
    return respon(res, 200, result);
  } catch (error) {
    return respon(res, 400, error);
  }
};

category.drop = async (req, res) => {
  try {
    const result = await model.drop();
    return respon(res, 200, result);
  } catch (error) {
    return respon(res, 500, error, true);
  }
};

module.exports = category;
