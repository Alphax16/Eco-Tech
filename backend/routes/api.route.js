const express = require("express");

const apicontroller = require("../controllers/api.controller");
const _router = express.Router();

_router.post(
  "/api/WaterPotabilityPredictor",
  apicontroller.WaterPotabilityPredictor
);

module.exports = _router;
