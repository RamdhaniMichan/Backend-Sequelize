const Sequelize = require("sequelize");
const db = require("../Config/db").sequelize;

class Users {
  constructor() {
    this.Users = db.define("Users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });
  }

  commit() {
    return new Promise((resolve, reject) => {
      this.Users.sync()
        .then(() => {
          resolve("Users Data Commit Success");
        })
        .catch((err) => {
          console.log(err);
          reject("Something went wrong \n", err);
        });
    });
  }

  add(data) {
    return new Promise((resolve, reject) => {
      this.Users.create({
        email: data.email,
        password: data.password,
        role: data.role,
      })
        .then(() => {
          resolve(`Data ${data.name} Success Update`);
        })
        .catch((err) => {
          if (err.name.toString() === "SequelizeDatabaseError") {
            reject("Please Commit Data");
          } else {
            reject(err);
          }
        });
    });
  }

  update(data, id) {
    return new Promise((reslove, reject) => {
      this.Users.findByPk(id)
        .then((record) => {
          result;
          if (!record) {
            reject("Data not found");
          }

          record.update(data).then(() => {
            reslove(`Data ${data.name} Success Update`);
          });
        })
        .catch((err) => {
          if (err.name.toString() === "SequelizeDatabaseError") {
            reject("SIlahkan komit database terlebih dahulu");
          } else {
            reject(err);
          }
        });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.Users.findAll()
        .then((res) => {
          if (res.length <= 0) {
            resolve("Data not found");
          } else {
            resolve(res);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.name.toString() === "SequelizeDatabaseError") {
            reject("Please Commit Data");
          } else {
            reject(err);
          }
        });
    });
  }

  async getEmail(email) {
    return new Promise((reslove, reject) => {
      this.Users.findAll({
        order: [["createdAt", "DESC"]],
        where: {
          email,
        },
      })
        .then((res) => {
          if (res.length <= 0) {
            reslove("Data not Found");
          } else {
            reslove(res);
          }
        })
        .catch((err) => {
          if (err.name.toString() == "SequelizeDatabaseError") {
            reject("SIlahkan komit database terlebih dahulu");
          } else {
            reject(err);
          }
        });
    });
  }

  destroy(id) {
    return new Promise((reslove, reject) => {
      this.Users.findByPk(id)
        .then((record) => {
          if (!record) {
            reject("Data not found");
          }

          record.destroy().then(() => {
            reslove(`Data ${id} Success Delete`);
          });
        })
        .catch((err) => {
          if (err.name.toString() === "SequelizeDatabaseError") {
            reject("SIlahkan komit database terlebih dahulu");
          } else {
            reject(err);
          }
        });
    });
  }

  drop() {
    return new Promise((reslove, reject) => {
      this.Users.drop()
        .then(() => {
          reslove("User data Droped succsess");
        })
        .catch((err) => {
          console.log(err);
          reject("Something when wrong \n", err);
        });
    });
  }
}

module.exports = new Users();
