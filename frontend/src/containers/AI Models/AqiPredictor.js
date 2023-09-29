import { Box, Flex, Select, Button, Center } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
function AqiPredictor() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const handleSubmit = () => {
    const selectedDate = `${day}-${month}-${year}`;
    
    
    axios.post("http://localhost:5000/api/ai/aqi-predictor", { date: selectedDate })
      .then((response) => {
    
       alert(response.data);
      })
      .catch((error) => {
        
        console.error("Error:", error);
      });
    }
  const generateDayOptions = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(i.toString().padStart(2, "0"));
    }
    return days;
  };

  const generateMonthOptions = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(i.toString().padStart(2, "0"));
    }
    return months;
  };

  const generateYearOptions = () => {
    const years = [];
    for (let i = 2015; i <= 2020; i++) {
      years.push(i.toString());
    }
    return years;
  };

  return (
    <Box p={32} h="100vh" bg="#12504B">
        <Center>
    <Flex>
        
      <Box>
        <Select
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          color={'black'}
          background={'white'}
          
        >
          {generateDayOptions().map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
      </Box>
      <Box mx={2}>
        <Select
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          color={'black'}
          background={'white'}
        >
          {generateMonthOptions().map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Select
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          color={'black'}
          background={'white'}
        >
          {generateYearOptions().map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>
      </Box>
      <Button ml={2} colorScheme="teal" onClick={handleSubmit}>
        Submit
      </Button>
    </Flex>
    </Center>
    </Box>
  );
}

export default AqiPredictor;
