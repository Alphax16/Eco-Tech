import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "../components/Plot";


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
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {/* <div>Plot:</div> */}
            <Plot data={treeStats} />
        </div>
    )
}

export default Visualizations;
