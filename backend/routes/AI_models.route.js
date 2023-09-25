const express = require("express");

const apicontroller = require("../controllers/AI_models.controller");
const _router = express.Router();

_router.post(
  "/api/ai/water-potability-predictor",
  apicontroller.waterPotabilityPredictor
);

_router.post("/api/ai/oil-spill-detector", apicontroller.oilSpillDetector);

_router.post("/api/ai/noise-pollution-detector", apicontroller.noisePollutionDetector);

module.exports = _router;
