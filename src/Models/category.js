const Sequelize = require("sequelize");
const db = require("../Config/db").sequelize;

class Categorys {
  constructor() {
    this.Categorys = db.define("Categorys", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      category: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });
  }

  commit() {
    return new Promise((resolve, reject) => {
      this.Categorys.sync()
        .then(() => {
          resolve("Category Data Commit Success");
        })
        .catch((err) => {
          console.log(err);
          reject("Something went wrong \n", err);
        });
    });
  }

  add(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.Categorys.create({
        category: data.category,
      })
        .then(() => {
          resolve(`Data ${data.name} Success Create`);
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
      this.Categorys.findByPk(id)
        .then((record) => {
          if (!record) {
            reject("Data not found");
          }

          record.update(data).then(() => {
            reslove(`Data ${data.name} Success Update`);
          });
        })
        .catch((err) => {
          if (err.name.toString() === "SequelizeDatabaseError") {
            reject("Please commit data");
          } else {
            reject(err);
          }
        });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.Categorys.findAll()
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
            reject("Please commit data");
          } else {
            reject(err);
          }
        });
    });
  }

  drop() {
    return new Promise((resolve, reject) => {
      this.Categorys.drop()
        .then(() => {
          resolve("Category Data Commit Success");
        })
        .catch((err) => {
          console.log(err);
          reject("Something went wrong \n", err);
        });
    });
  }
}

module.exports = new Categorys();
