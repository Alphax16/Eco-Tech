import React, { createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Tour from "./Tour";
import { TourProvider } from "./context/TourContext";

import Home from "./containers/Home";
import ForestMap from "./containers/ForestMap";
import Statistics from "./components/StatCards";
import Visualizations from "./containers/Visualizations";
import Quiz from "./containers/Quiz";
import NotFound from "./containers/NotFound";

import AI_Model_Routes from "./AI_Model_Routes";
import StatCards from "./components/StatCards";


function App() {

  return (
    <div>
    <Router>
      <Navbar />
      <TourProvider>
        <Tour />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forest-map" element={<ForestMap />} />
          <Route path="/statistics" element={<StatCards />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path="/models/*" element={<AI_Model_Routes />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TourProvider>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
