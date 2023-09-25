import { Routes, Route } from "react-router-dom";

import ModelCards from "./components/ModelCards";
import WaterPotabilityPredictor from "./containers/WaterPotabilityPredictor";
import OilSpillDetector from "./containers/OilSpillDetector";
import NoisePollutionDetector from "./containers/NoisePollutionDetector";


function AI_Model_Routes() {
    return (
      <Routes>
        <Route path="/" element={<ModelCards />} />
        <Route path="water-potability-predictor" element={<WaterPotabilityPredictor />} />
        <Route path="oil-spill-detector" element={<OilSpillDetector />} />
        <Route path="noise-pollution-detector" element={<NoisePollutionDetector />} />
      </Routes>
    );
  }

export default AI_Model_Routes