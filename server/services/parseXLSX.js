const XLSX = require("xlsx");

/**
 * Parses the uploaded XLSX file and extracts valid transaction objects.
 * @param {Buffer} buffer - The buffer of the uploaded file
 * @returns {Array} Array of transaction objects { description, amount, date }
 */
function parseXLSX(buffer) {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet);

  const transactions = rows
    .map((row, index) => {
      const description =
        row.Description || row.description || "No Description";

      const amount = parseFloat(row.Amount || row.amount);
      const date = new Date(row.Date || row.date);

      // Validate amount and date
      if (isNaN(amount)) {
        console.warn(
          `Row ${index + 2}: Invalid amount`,
          row.Amount || row.amount
        );
        return null;
      }

      if (isNaN(date.getTime())) {
        console.warn(`Row ${index + 2}: Invalid date`, row.Date || row.date);
        return null;
      }

      return {
        description,
        amount,
        date,
      };
    })
    .filter((t) => t !== null); // remove invalid rows

  return transactions;
}

module.exports = parseXLSX;
