import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PollutionTypes from "../components/PollutionTypes";
import Footer from "../components/Footer";
import ModelCards from "../components/ModelCards";

const Home = () => {
  return (
    <Box>
      {/* <Navbar /> */}
      <HeroSection />
      <PollutionTypes />
      <ModelCards />
    </Box>
  );
};

export default Home;
