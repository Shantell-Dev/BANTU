const mongoose = require("mongoose");
mongoose.connection.on("error", (error) => {
  console.error("Failed to connect to MongoDB on startup:", error);
});
const DB_URI = "mongodb://localhost:27017";

module.exports = { startDb };
