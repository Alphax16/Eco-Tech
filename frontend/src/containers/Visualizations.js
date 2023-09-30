import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "../components/Plot";
import { Box, Flex } from "@chakra-ui/react";


function Visualizations() {
    const [treeStats, setTreeStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await axios.post("http://127.0.0.1:5000/api/tree-cover");
                console.log(response.data);
                setTreeStats(response.data);
            } catch (err) {
                console.error("Error fetching 'tree-cover' API data:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <Flex py={'16'} bg={'#12504B'} h={'100vh'}>
        {/* <div style={{display: 'flex', justifyContent: 'center'}}> */}
            {/* <div>Plot:</div> */}
            <Plot data={treeStats} />
        {/* </div> */}
        </Flex>
    )
}

export default Visualizations;
