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


function App() {
  return (
    <Router>
      <Navbar />

      <Tour />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/forest-map" element={<ForestMap />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/visualizations" element={<Visualizations />} />
        <Route path="/models/WaterPotabilityPredictor" element={<WaterPotabilityPredictor />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
