const express = require("express");
const dotenv = require("dotenv");
const { syncDB } = require("./models");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const { startCronJobs } = require("./cron/jobs");
const cors = require("cors");
const sequelize = require("./config/db");

sequelize
  .authenticate()
  .then(() => console.log("DB connected 🎉"))
  .catch((err) => console.error("DB error ❌", err));
dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // React dev server
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;

syncDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    startCronJobs(); // ⏲️ Start cron jobs
  });
});
