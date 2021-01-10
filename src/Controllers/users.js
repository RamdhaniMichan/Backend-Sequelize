const bcr = require("bcrypt");
const model = require("../Models/users");
const respon = require("../Helpers/respons");
const hashPassword = require("../Helpers/hash");

class Users {
  async commit(req, res) {
    try {
      const result = await model.commit();
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 500, error, true);
    }
  }

  async add(req, res) {
    try {
      const { email, password } = req.body;
      if (email <= 0) {
        return respon(res, 400, { msg: "Email is required" });
      }
      if (password <= 0) {
        return respon(res, 400, { msg: "Password is required" });
      }

      const emailDB = await model.getEmail(req.body.email);
      console.log(emailDB);
      if (emailDB.length >= 1) {
        return respon(res, 400, { msg: "Mail is registered" });
      }

      const newPassword = await hashPassword(req.body.password);
      const users = {
        email: req.body.email,
        password: newPassword,
        role: req.body.role,
      };

      const data = await model.add(users);

      return respon(res, 200, data);
    } catch (error) {
      return respon(res, 400, error);
    }
  }

  async getAll(req, res) {
    try {
      const data = await model.getAll();
      return respon(res, 200, data);
    } catch (error) {
      return respon(res, 400, error);
    }
  }

  async getEmail(req, res) {
    try {
      const data = await model.getEmail(req.body.email);
      return respon(res, 200, data);
    } catch (error) {
      return respon(res, 400, error);
    }
  }

  async update(req, res) {
    try {
      const { email, password } = req.body;
      if (email <= 0) {
        return respon(res, 400, { msg: "Email is required" });
      }
      if (password <= 0) {
        return respon(res, 400, { msg: "Password is required" });
      }

      const emailDB = await model.getEmail(req.body.email);
      // const check = await bcr.compare(password, emailDB[0].password);
      // console.log(emailDB[0].password);
      // if (check) {
      //   return respon(res, 400, { msg: "Password Not Correct" });
      // }

      const newPassword = await hashPassword(req.body.password);
      const users = {
        email: req.body.email,
        password: newPassword,
        role: req.body.role,
      }; emailDB[0].password;

      const { id } = req.body;
      const data = await model.update(users, id);

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

module.exports = new Users();
