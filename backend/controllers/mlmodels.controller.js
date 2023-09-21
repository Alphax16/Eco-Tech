const runPythonScript = require("../utils/pythonScriptRunner");
const cloudinary = require("../config/cloudinary");
const fileupload = require("express-fileupload");


const waterPotabilityPredictor = async (req, res) => {
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
  console.log('Script Response:', result);

  res.send(result);
};

const oilSpillDetector = async (req, res) => {
  try {
    const file = req.files.file;
    console.log(req.file);
    const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "images",
    });

    console.log('Cloudinary Response:', cloudinaryResponse);

    const cloudinaryURL = cloudinaryResponse.secure_url;

    const scriptPath = "./python-models/OilSpillDetector.py";
    const cmdLineArgs = `${cloudinaryURL}`;

    const result = await runPythonScript(scriptPath, cmdLineArgs);
    console.log('Script Response:', result);

    // res.status(200).json({ success: "Uploaded successfully" });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading file" });
  }
};

module.exports = {
  waterPotabilityPredictor,
  oilSpillDetector,
};
