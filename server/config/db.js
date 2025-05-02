require("dotenv").config(); // must be at the top

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, // <-- Make sure this logs as string
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

// Optional: Debug
console.log("Connecting to DB with user:", process.env.DB_USER);
console.log("Password is string:", typeof process.env.DB_PASS === "string");

module.exports = sequelize;
