import React, { useState, useEffect } from "react";
import ExcelTable from "../components/Table";
import axios from "axios";


function Statistics() {
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
        <div>
            <div>Statistics</div>
            <ExcelTable data={treeStats} />
        </div>
    )
}

export default Statistics;
