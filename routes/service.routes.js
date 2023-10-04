const express = require("express");
const router = express.Router();
const Service = require("../models/Services.model");

router.post("/service", (req, res, next) => {
  const { name, duration, price, description } = req.body;
  Service.create({ name, duration, price, description: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/service", (req, res, next) => {
  Service.find()
    .then((allService) => res.json(allService))
    .catch((err) => res.json(err));
});

router.get("/service/:serviceId", (req, res, next) => {
  const { serviceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Service.findById(serviceId)
    .populate(" ")
    .then((client) => res.status(200).json(service))
    .catch((error) => res.json(error));
});
router.put("/service/:serviceId", (req, res, next) => {
  const { serviceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Service.findByIdAndUpdate(serviceId, req.body, { new: true })
    .then((updatedService) => res.json(updatedService))
    .catch((error) => res.json(error));
});
router.delete("/service/:serviceId", (req, res, next) => {
  const { serviceId } = req.params;

  Service.findByIdAndRemove(serviceId)
    .then(() =>
      res.json({
        message: `Service with ${serviceId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
