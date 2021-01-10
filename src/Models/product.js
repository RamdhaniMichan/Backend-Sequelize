const Sequelize = require("sequelize");
const db = require("../Config/db").sequelize;
const modelCategory = require("./category");

class Products {
  constructor() {
    this.Products = db.define("Products", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idcategory: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Categorys",
          key: "id",
        },
      },
    });
    this.Products.belongsTo(modelCategory.Categorys, {
      foreignKey: "idcategory",
      as: "Category",
    });
  }

  commit() {
    return new Promise((resolve, reject) => {
      this.Products.sync()
        .then(() => {
          resolve("Product Data Commit Success");
        })
        .catch((err) => {
          console.log(err);
          reject("Something went wrong \n", err);
        });
    });
  }

  get() {
    return new Promise((resolve, reject) => {
      this.Products.findAll({
        order: [["createdAt", "DESC"]],
        include: [{ model: modelCategory.Categorys, as: "Category" }],
      })
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

  findBy(data) {
    return new Promise((reslove, reject) => {
      this.Products.findAll({
        order: [["createdAt", "DESC"]],
        where: data,
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
            reject("Please commit data");
          } else {
            reject(err);
          }
        });
    });
  }

  add(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.Products.create({
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        idcategory: data.idcategory,
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
      this.Products.findByPk(id)
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

  destroy(id) {
    return new Promise((reslove, reject) => {
      this.Products.findByPk(id)
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
    return new Promise((reslove, reject) => {
      this.Products.drop()
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

module.exports = new Products();
