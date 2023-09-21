import { Box, Text } from "@chakra-ui/react";
import "./App.css";
import React, { createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Quiz from "./containers/Quiz";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ForestMap from "./containers/ForestMap";
import WaterPotabilityPredictor from "./containers/WaterPotabilityPredictor";
import Statistics from "./containers/Statistics";
import Visualizations from "./containers/Visualizations";
import NotFound from "./containers/NotFound";
import Tour from "./Tour";
import ModelCards from "./components/ModelCards";
import { TourProvider } from "./context/TourContext";
import OilSpillPredictor from "./containers/OilSpillPredictor";

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
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route
            path="/model/WaterPotabilityPredictor"
            element={<WaterPotabilityPredictor />}
          />
          <Route path="/models" element={<ModelCards />} />
          <Route path="/model/oilSpillPredictor" element={<OilSpillPredictor />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TourProvider>
      <Footer />
    </Router>
  );
}

export default App;