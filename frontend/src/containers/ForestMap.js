import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import {
  Box,
  Center,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  Button,
} from "@chakra-ui/react";

import { Marker, Popup } from "react-leaflet";
// import Marker from "../components/Marker";

import "leaflet/dist/leaflet.css";

const ForestMap = () => {
  const mapRef = useRef(null);
  const [shapefileData, setShapefileData] = useState(null);
  const [treeStats, setTreeStats] = useState([]);

  const [selectedYear, setSelectedYear] = useState(null);
  const [isYearSelectorOpen, setIsYearSelectorOpen] = useState(true);

  const mapStyle = {
    weight: 1.5,
    fillColor: "lightgreen",
    fillOpacity: 0.7,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://geekco.onrender.com/api/map-data");
        console.log(response.data);
        setShapefileData(response.data);
      } catch (err) {
        console.error("Error fetching 'map-data' API data:", err);
      }
    };

    fetchData();
  }, []);

  // const toggleYearSelector = () => {
  //   setIsYearSelectorOpen(!isYearSelectorOpen);
  // };

  const selectYear = (year) => {
    setSelectedYear(year);
    // setIsYearSelectorOpen(false);
  };

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

  const customIcon = L.icon({
    iconUrl: "assets/LocIcon.png",
    iconSize: [32, 32],
  });

  return (
    <Box id="map" minH="100vh" spacing={4} bg="#12504B" py={"16"}>
      <Heading
        py={"6"}
        color={"#fff"}
        textAlign={"center"}
        fontSize={{ base: "2xl", sm: "4xl" }}
        fontWeight={"bold"}
      >
        Tree Coverage Area (in Sq. kilometers)
      </Heading>
      <VStack
        justifyContent="center"
        alignItems="flex-start"
        // flexDir={{ base: "column", lg: "row" }}
        flexDir={{ lg: "row" }}
      >
        <Box color="#fff" width={"25%"}>
          <Center>
            <FormControl width={"50%"} textAlign={"center"}>
              <Text mt={"-60px"} 
              // ml={"-2.5vw"} 
              py={"6"} fontSize={{ base: 'sm', sm: 'lg' }}>
                Select Year:
              </Text>
              <Popover
                isOpen={isYearSelectorOpen}
                // onClose={toggleYearSelector}
                placement="bottom-start"
              >
                {/* <PopoverTrigger> */}
                {/* <Button
                    id="yearSelect"
                    variant="outline"
                    bg="teal.200"
                    onClick={toggleYearSelector}
                    zIndex={1}
                  >
                    {selectedYear || "Select a Year"}
                  </Button> */}
                {/* </PopoverTrigger> */}

                <PopoverContent zIndex={12} width={{base: "60%", lg: "12rem"}}>
                  <PopoverBody>
                    <VStack spacing={1}>
                      {
                        // Array.from({ length: 2023 - 1987 + 1 }, (_, index) => 1987 + index)
                        [
                          1987, 1989, 1991, 1993, 1995, 1997, 1999, 2001, 2003,
                          2005, 2007, 2011, 2013,
                        ].map((year) => (
                          <Button
                            key={year}
                            variant="ghost"
                            onClick={() => selectYear(year)}
                            isActive={year === selectedYear}
                          >
                            {year}
                          </Button>
                        ))
                      }
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </FormControl>
          </Center>
        </Box>

        <Box w="70%" h="600px" px={"0.5"} zIndex={"1"}>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
            id="map"
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {shapefileData && <GeoJSON data={shapefileData} style={mapStyle} />}

            {/* {(mapRef.current) && <Marker loc={'New York'} lat={40.7128} long={-74.0060} map={mapRef.current} />} */}

            {treeStats &&
              selectedYear &&
              treeStats.map((ts) => {
                console.log("ts:", ts);
                return (
                  <Marker position={[ts.Latitude, ts.Longitude]} icon={customIcon}>
                    <Popup>{`${ts["State/UT"]} [Tree Count: ${
                      ts[parseInt(selectedYear)]
                    }]`}</Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        </Box>
      </VStack>
    </Box>
  );
};

export default ForestMap;
