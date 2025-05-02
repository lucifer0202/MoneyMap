const { Transaction } = require("../models");
const parseXLSX = require("../services/parseXLSX");
const csv = require("csv-parser");
const path = require("path");
const XLSX = require("xlsx");
// const filePath = require('')
exports.create = async (req, res) => {
  const { description, amount, date } = req.body;
  const transaction = await Transaction.create({
    description,
    amount,
    date,
    UserId: req.user.id,
  });
  res.status(201).json(transaction);
};

exports.list = async (req, res) => {
  const transactions = await Transaction.findAll({
    where: { UserId: req.user.id },
  });
  res.json(transactions);
};

exports.webhook = async (req, res) => {
  // Expected body: { phone: "...", message: "Spent 500 on groceries" }
  const { message } = req.body;

  // Basic parser example
  const match = message.match(/([\d.]+).*on (.+)/i);
  if (!match) return res.status(400).json({ message: "Invalid format" });

  const amount = parseFloat(match[1]);
  const description = match[2];

  const transaction = await Transaction.create({
    description,
    amount,
    date: new Date(),
    UserId: 1, // Replace with logic to identify user based on phone or token
  });

  res.status(201).json(transaction);
};

exports.importFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "File required" });

  const ext = path.extname(req.file.originalname).toLowerCase();
  const transactions = [];

  try {
    if (ext === ".csv") {
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => {
          transactions.push({
            description: data.description,
            amount: parseFloat(data.amount),
            date: new Date(data.date),
            UserId: req.user.id,
          });
        })
        .on("end", async () => {
          console.log("Parsed CSV transactions:", transactions);
          await Transaction.bulkCreate(transactions);
          return res.status(201).json({ message: "CSV transactions imported" });
        })
        .on("error", (err) => {
          console.error("CSV parse error:", err);
          return res.status(500).json({ error: "Failed to parse CSV" });
        });
    } else if (ext === ".xlsx") {
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      let headerIndex = rows.findIndex(
        (row) =>
          row.includes("description") &&
          row.includes("amount") &&
          row.includes("date")
      );

      if (headerIndex === -1) {
        throw new Error("Header row not found");
      }

      const headers = rows[headerIndex];
      const dataRows = rows.slice(headerIndex + 1);
      const descriptionIndex = headers.indexOf("description");
      const amountIndex = headers.indexOf("amount");
      const dateIndex = headers.indexOf("date");

      const transactions = dataRows
        .filter((row) => row.length >= 3)
        .map((row) => {
          const description = row[descriptionIndex];
          const amount = parseFloat(row[amountIndex]);
          const excelDate = row[dateIndex];

          const date = new Date((excelDate - 25569) * 86400 * 1000); // Excel date to JS Date

          return {
            description,
            amount,
            date,
            UserId: req.user.id,
          };
        });

      const formatted = transactions.map((row) => ({
        description: row.description,
        amount: parseFloat(row.amount),
        date: new Date(row.date),
        UserId: req.user.id,
      }));

      if (formatted.length === 0) {
        return res
          .status(400)
          .json({ message: "No valid transactions found in XLSX file" });
      }

      await Transaction.bulkCreate(formatted);
      return res.status(201).json({ message: "XLSX transactions imported" });
    } else {
      return res.status(400).json({ message: "Unsupported file format" });
    }
  } catch (err) {
    console.error("Import failed:", err);
    return res.status(500).json({ error: "Import failed" });
  }
};
