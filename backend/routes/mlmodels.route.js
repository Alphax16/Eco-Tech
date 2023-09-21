const express = require("express");

const apicontroller = require("../controllers/mlmodels.controller");
const _router = express.Router();

_router.post(
  "/api/WaterPotabilityPredictor",
  apicontroller.WaterPotabilityPredictor
);

_router.post("/api/oilSpillPredictor", apicontroller.oilSpillPredictor);

module.exports = _router;
