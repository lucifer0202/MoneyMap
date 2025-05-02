const express = require("express");
const router = express.Router();
const transaction = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const auth = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, transaction.create);
router.get("/", authMiddleware, auth, transaction.list);

// Webhook (optional, unsecured — secure this in production)
router.post("/webhook", transaction.webhook);
router.post(
  "/import",
  authMiddleware,
  upload.single("file"),
  transaction.importFile
);

module.exports = router;
