// app.js
const { isAuthenticated } = require("./middleware/jwt.middleware");
const express = require("express");
const app = express();

// require("./config")(app);
require("./db");
//  Start handling routes here
// const allRoutes = require("./routes");
// app.use("/api", allRoutes);

const appointmentRouter = require("./routes/appointment.routes");
app.use("/api", isAuthenticated, appointmentRouter);

const clientRouter = require("./routes/client.routes");
app.use("/api", isAuthenticated, clientRouter);

const serviceRouter = require("./routes/service.routes");
app.use("/api", isAuthenticated, serviceRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

require("./error-handling")(app);

module.exports = app;
