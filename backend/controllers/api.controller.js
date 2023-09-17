const runPythonScript = require("../utils/pythonScriptRunner");

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
    Turbidity
  } = req.body;
  
  const scriptPath = "./python-models/WaterPotabilityPredictor.py";
  const cmdLineArgs = `${ph} ${Hardness} ${Solids} ${Chloramines} ${Sulfate} ${Conductivity} ${Organic_carbon} ${Trihalomethanes} ${Turbidity}`

  const result = await runPythonScript(scriptPath, cmdLineArgs);
  console.log('Result:', result);
  
  res.send(result);
};

module.exports = {
  WaterPotabilityPredictor,
};
