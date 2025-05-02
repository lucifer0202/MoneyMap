const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Transaction = sequelize.define("Transaction", {
  description: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  date: DataTypes.DATE,
});

Transaction.belongsTo(User);
User.hasMany(Transaction);

module.exports = Transaction;
