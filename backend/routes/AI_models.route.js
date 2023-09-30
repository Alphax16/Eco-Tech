const express = require("express");

const apicontroller = require("../controllers/AI_models.controller");
const _router = express.Router();

_router.post(
  "/api/ai/water-potability-predictor",
  apicontroller.waterPotabilityPredictor
);

_router.post("/api/ai/oil-spill-detector", apicontroller.oilSpillDetector);

_router.post("/api/ai/noise-pollution-detector", apicontroller.noisePollutionDetector);

_router.post("/api/ai/fire-detector", apicontroller.firedetector);

_router.post("/api/ai/aqi-predictor", apicontroller.aqipredictor);

/*
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const picklejs = require('pickle-js');

_router.post("/api/ai/aqi-predictor", async (req, res) => {
  const model = await tf.loadLayersModel("../weights-pickles/AQI_Predictor.h5");
  const { date } = req.body;

  // Read the Python pickle file into a Buffer
  const pickleData = fs.readFileSync("../weights-pickles/AQI_Time_Series_Data_Scaler.pkl");

  // Parse the pickle data
  const scaler = picklejs.loads(pickleData);

  try {
    const inputDate = new Date(date.split('-').reverse().join('-'));
    const today = new Date();
    const daysAgo = Math.floor((today - inputDate) / (1000 * 60 * 60 * 24));

    if (daysAgo < numSteps) {
        console.log('Not enough historical data available for prediction.');
    } else {
      const userInput = new Array(numSteps).fill(0);
      const scaledInput = scaler.transform([userInput]);
      const scaledInputTensor = tf.tensor2d(scaledInput);

      const prediction = model.predict(scaledInputTensor);
      const predictedPM25 = prediction.squeeze().arraySync()[0][0];
      console.log(predictedPM25);
    }
  } catch (err) {
      console.log('Invalid date format. Please enter the date in DD-MM-YYYY format.');
  }
});
*/

module.exports = _router;
