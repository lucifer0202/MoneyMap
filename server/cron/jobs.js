const cron = require("node-cron");

function startCronJobs() {
  // Run every day at 8 AM
  cron.schedule("0 8 * * *", () => {
    console.log(`[CRON] Daily reminder at ${new Date().toLocaleTimeString()}`);
    // Optionally, send notifications or generate summaries here
  });

  // Weekly summary on Sunday at 6 PM
  cron.schedule("0 18 * * 0", () => {
    console.log(
      `[CRON] Weekly summary job at ${new Date().toLocaleTimeString()}`
    );
    // Implement logic to aggregate and send data if needed
  });
}

module.exports = { startCronJobs };
