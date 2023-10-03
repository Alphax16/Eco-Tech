import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "../components/Plot";
import { Heading, Flex, VStack } from "@chakra-ui/react";


function Visualizations() {
  const [treeStats, setTreeStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://geekco.onrender.com/api/tree-cover");
        console.log(response.data);
        setTreeStats(response.data);
      } catch (err) {
        console.error("Error fetching 'tree-cover' API data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Flex
      justify="center"
      align="center"
      minH="100vh"
      bg="#12504B"
    >
      <VStack spacing={16} align="center">
        <Heading
          fontSize={{ base: "2xl", sm: "4xl" }}
          fontWeight="bold"
          color="white"
          marginTop="-10%"
        >
          Tree Coverage Area (in Sq. kilometers) Time Series Plots
        </Heading>
        <Plot data={treeStats} width={'90vw'} />
      </VStack>
    </Flex>
  );
}

export default Visualizations;
