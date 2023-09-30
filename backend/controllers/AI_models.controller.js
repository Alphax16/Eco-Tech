const runPythonScript = require("../utils/pythonScriptRunner");
const cloudinary = require("../config/cloudinary");
const fileupload = require("express-fileupload");
const { toTitleCase, getNextElementAfterLastDelimiter, removeEscapeSequences } = require("../utils/responseFormatter");


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

  const resultFormatted = toTitleCase(result);

  res.send(resultFormatted);
};




const aqipredictor = async (req, res) => {
  const {
   date
  } = req.body;

  const scriptPath = "./python-models/AQI_TimeSeriesPredictor.py";
  const cmdLineArgs = `${date}`;

  const result = await runPythonScript(scriptPath, cmdLineArgs);

  console.log('Script Response(Result):', result);

  const resultFormatted = removeEscapeSequences(getNextElementAfterLastDelimiter(result));

  console.log('Script Response(Result) Formatted:', resultFormatted);

  res.send(resultFormatted);
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

    res.status(200).json({ success: "Uploaded successfully!", url: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading file" });
  }
};

const noisePollutionDetector = async (req, res) => {
  try {
    const file = req.files.file;
    const { areaType, dayTime } = req.body;
    
    console.log('Req.files value:', req.files);
    console.log('Req.body:', req.body);

    const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
      folder: "audios",
    });

    console.log('Cloudinary Response:', cloudinaryResponse);

    const cloudinaryURL = cloudinaryResponse.secure_url;

    const scriptPath = "./python-models/NoisePollutionDetector.py";
    const cmdLineArgs = `${areaType.toLowerCase()} ${dayTime} ${cloudinaryURL}`;

    console.log('Command line arguments:', cmdLineArgs);

    const result = await runPythonScript(scriptPath, cmdLineArgs);
    console.log('Script Response:', result);

    res.status(200).json({ success: "Uploaded successfully!", url: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error uploading file" });
  }
}
const firedetector = async (req, res)=>{
  try {
    const file = req.files.file;
    
    const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
      folder: "fire",
    });

    console.log('Cloudinary Response:', cloudinaryResponse);

    const cloudinaryURL = cloudinaryResponse.secure_url;

    const scriptPath = "./python-models/ForestFireDetector.py";
    const cmdLineArgs = `${cloudinaryURL}`;

    console.log('Command line arguments:', cmdLineArgs);

    const result = await runPythonScript(scriptPath, cmdLineArgs);
    console.log('Script Response:', result);

    res.status(200).json({ success: "Uploaded successfully!", url: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error uploading file" });
  }
}


module.exports = {
  waterPotabilityPredictor,
  oilSpillDetector,
  noisePollutionDetector,
  firedetector,
  aqipredictor
};
