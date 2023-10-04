require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 5005;

const start = async () => {
  await app.listen(PORT, () => {
    console.log("Server listening on port http://localhost:5005");
  });
};

start();