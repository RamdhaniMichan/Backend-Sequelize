const Sequelize = require("sequelize");
const db = require("../Config/db").sequelize;

class History {
  constructor() {
    this.History = db.define("History", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      chasier: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      orders: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
    });
  }

  commit() {
    return new Promise((resolve, reject) => {
      this.History.sync()
        .then(() => {
          resolve("History Data Commit Success");
        })
        .catch((err) => {
          console.log(err);
          reject("Something went wrong \n", err);
        });
    });
  }

  get() {
    return new Promise((resolve, reject) => {
      this.History.findAll()
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

  add(data) {
    return new Promise((resolve, reject) => {
      this.History.create({
        chasier: data.chasier,
        amount: data.amount,
        orders: data.orders,
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

  destroy(id) {
    return new Promise((reslove, reject) => {
      this.History.findByPk(id)
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
    return new Promise((resolve, reject) => {
      this.History.drop()
        .then(() => {
          resolve("History Data Drop Success");
        })
        .catch((err) => {
          console.log(err);
          reject("Something went wrong \n", err);
        });
    });
  }
}

module.exports = new History();
