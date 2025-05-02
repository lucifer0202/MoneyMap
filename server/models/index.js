const sequelize = require("../config/db");
const User = require("./user");
const Transaction = require("./transaction");

const syncDB = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = { sequelize, User, Transaction, syncDB };
