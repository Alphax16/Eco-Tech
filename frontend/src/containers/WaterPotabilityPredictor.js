import { Box, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

const WaterPotabilityPredictor = () => {
  const [loading, setLoading] = useState(false); // Track loading status
  const [responseText, setResponseText] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const [ph, setPh] = useState();
  const [Hardness, setHardness] = useState();
  const [Solids, setSolids] = useState();
  const [Chloramines, setChloramines] = useState();
  const [Organic_carbon, setOrganic_carbon] = useState();

  const [Trihalomethanes, setTrihalomethanes] = useState();
  const [Turbidity, setTurbidity] = useState();
  const [Sulfate, setSulfate] = useState();
  const [Conductivity, setConductivity] = useState();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/WaterPotabilityPredictor",
        {
          ph,
          Hardness,
          Solids,
          Chloramines,
          Organic_carbon,
          Trihalomethanes,
          Turbidity,
          Sulfate,
          Conductivity,
        }
      );
      console.log(response.data);

      setTimeout(() => {
        setLoading(false);
        alert(response.data);
        setResponseText(response.data);
        setShowResponse(true);
      }, 4000);
    } catch (err) {
      console.error("Error fetching tree data:", err);
      setLoading(false);
    }
  };

  return (
    <Box bg={"#12504B"} py={"16"}>
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor="#00FF00"
            innerCircleColor="#0000FF"
            middleCircleColor="#FF0000"
          />
        </div>
      )}
      <form style={{ width: "40%", color: "#fff" }} onSubmit={handlesubmit}>
        <Input
          type="text"
          placeholder="ph"
          onChange={(e) => setPh(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Hardness"
          onChange={(e) => setHardness(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Solids"
          onChange={(e) => setSolids(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Chloramines"
          onChange={(e) => setChloramines(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Sulfate"
          onChange={(e) => setSulfate(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Conductivity"
          onChange={(e) => setConductivity(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Organic Carbon"
          onChange={(e) => setOrganic_carbon(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Trihalomethanes"
          onChange={(e) => setTrihalomethanes(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Turbidity"
          onChange={(e) => setTurbidity(e.target.value)}
        />
        <Button type="submit">Get Predictions</Button>
      </form>
      {showResponse && <p>{responseText}</p>}
    </Box>
  );
};

export default WaterPotabilityPredictor;
