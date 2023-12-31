import React, { useState, useEffect } from "react";
import ExcelTable from "../components/Table";
import axios from "axios";
import { Box, Heading } from "@chakra-ui/react";

function TreeStats() {
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
    <Box py={"16"} bgColor={"#12504B"} color="#fff">
      <Heading
        py={"4"}
        textAlign={"center"}
        fontSize={{ base: "2xl", sm: "4xl" }}
        fontWeight={"bold"}
      >
        Tree Coverage Area (in Sq. kilometers)
      </Heading>

      <ExcelTable data={treeStats} />
    </Box>
  );
}

export default TreeStats;
