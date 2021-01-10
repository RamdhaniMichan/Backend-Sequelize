const { Sequelize } = require("sequelize");

class db {
  constructor() {
    this.sequelize = new Sequelize(
      process.env.DBNAME,
      process.env.DBUSER,
      process.env.DBPASSWORD,
      {
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        dialect: "postgres",
        dialectOptions: {
          timezone: "Asia/Jakarta",
        },
      },
    );
  }

  sequelizeTest() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  }
}

module.exports = new db();
