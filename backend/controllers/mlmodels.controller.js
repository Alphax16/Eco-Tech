const runPythonScript = require("../utils/pythonScriptRunner");
const cloudinary = require("../config/cloudinary");
const fileupload = require("express-fileupload");
const WaterPotabilityPredictor = async (req, res) => {
  const {
    ph,
    Hardness,
    Solids,
    Chloramines,
    Sulfate,
    Conductivity,
    Organic_carbon,
    Trihalomethanes,
    Turbidity,
  } = req.body;

  const scriptPath = "./python-models/WaterPotabilityPredictor.py";
  const cmdLineArgs = `${ph} ${Hardness} ${Solids} ${Chloramines} ${Sulfate} ${Conductivity} ${Organic_carbon} ${Trihalomethanes} ${Turbidity}`;

  const result = await runPythonScript(scriptPath, cmdLineArgs);
  console.log("Result:", result);

  res.send(result);
};

const oilSpillPredictor = async (req, res) => {
  try {
    const file = req.files.file;
    console.log(req.file);
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "images",
    });

    res.status(200).json({ success: "Uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading file" });
  }
};

module.exports = {
  WaterPotabilityPredictor,
  oilSpillPredictor,
};
