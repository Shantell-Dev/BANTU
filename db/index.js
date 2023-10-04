const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/BANTU";

  const startDb = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("Error connecting to MongoDB: DB_URI is not defined.");
    }
    await mongoose.connect(MONGO_URI);
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB was disconnected");
      process.exit(0);
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    const timeout = 5000;
    console.log(`Error connecting to MongoDB: ${error}`);
    //setTimeout(startDb, timeout);
  }
};
startDb();

