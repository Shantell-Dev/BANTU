const express = require("express");
const { isAuthenticated } = require("./middleware/jwt.middleware");
const appointmentRouter = require("./routes/appointment.routes");
const clientRouter = require("./routes/client.routes");
const serviceRouter = require("./routes/service.routes");
const authRouter = require("./routes/auth.routes");
const sendmail = require("./routes/sendmail");
const app = express();

//require("./error-handling")(app);

require("./.config")(app);
require("./db");
//  Start handling routes here
// const allRoutes = require("./routes");
// app.use("/api", allRoutes);

app.use(
  "/api",
  // isAuthenticated,
  authRouter,
  appointmentRouter,
  clientRouter,
  serviceRouter,
  sendmail
);

// app.all("*", () => {
//   throw new Error("This page is not found in Bantu");
// });

module.exports = app;
