const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Client = require("../models/Client.model");
const Service = require("../models/Services.model");
const Appointment = require("../models/Appointment.model");

router.post("/client", (req, res, next) => {
  const { name, mobile, email, role } = req.body;

  Client.create({ name, mobile, email, role: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});
router.get("/client", (req, res, next) => {
  Client.find()
    .populate("")
    .then((allclients) => res.json(allClients))
    .catch((err) => res.json(err));
});
router.get("/client/:clientId", (req, res, next) => {
  const { clientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Client.findById(clientId)
    .populate(" ")
    .then((client) => res.status(200).json(client))
    .catch((error) => res.json(error));
});
router.put("/client/:clientId", (req, res, next) => {
  const { clientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Client.findByIdAndUpdate(clientId, req.body, { new: true })
    .then((updatedClient) => res.json(updatedClient))
    .catch((error) => res.json(error));
});
router.delete("/client/:clientId", (req, res, next) => {
  const { clientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Client.findByIdAndRemove(clientId)
    .then(() =>
      res.json({
        message: `Client with ${clientId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
