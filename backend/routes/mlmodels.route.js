const express = require("express");

const apicontroller = require("../controllers/mlmodels.controller");
const _router = express.Router();

_router.post(
  "/api/ai/water-potability-predictor",
  apicontroller.waterPotabilityPredictor
);

_router.post("/api/ai/oil-spill-detector", apicontroller.oilSpillDetector);

module.exports = _router;
