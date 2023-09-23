import { Box, Text } from "@chakra-ui/react";
import "./App.css";
import React, { createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Quiz from "./containers/Quiz";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ForestMap from "./containers/ForestMap";

import Visualizations from "./containers/Visualizations";
import NotFound from "./containers/NotFound";
import Tour from "./Tour";
import ModelCards from "./components/ModelCards";
import { TourProvider } from "./context/TourContext";
import WaterPotabilityPredictor from "./containers/WaterPotabilityPredictor";
import OilSpillDetector from "./containers/OilSpillDetector";
import StatCards from "./components/StatCards";
import TreeStats from "./containers/TreeStats";

function App() {
  return (
    <Router>
      <Navbar />
      <TourProvider>
        <Tour />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/forest-map" element={<ForestMap />} />
          <Route path="/statistics" element={<StatCards />} />

          <Route path="/statistics/Tree-data" element={<TreeStats />} />
          <Route path="/visualizations" element={<Visualizations />} />

          <Route path="/models" element={<ModelCards />} />

          <Route
            path="/models/water-potability-predictor"
            element={<WaterPotabilityPredictor />}
          />
          <Route
            path="/models/oil-spill-detector"
            element={<OilSpillDetector />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TourProvider>
      <Footer />
    </Router>
  );
}

export default App;
