import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import { LineController, LinearScale, Tooltip, LineElement, PointElement, CategoryScale } from 'chart.js';
import { ReactChart } from 'chartjs-react';

import { request } from "./hooks/Fetch";

// Register modules
ReactChart.register(LineController, LinearScale, LineElement, PointElement, Tooltip, CategoryScale);

const chartOptions = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

function Stats() {
    const [stats, setStats] = useState(null);
    const { device } = useParams();

    useEffect(() => {
        request({ url: "/api/device/" + device + "/stats/"  , callback: ({ msg, success, json }) => {
            if (success) {
                setStats(json.data);
            } else {
                alert("An error occurred fetching streams: " + msg);
            }
        }});
    }, []);

    if (!stats) return <></>;

    const mapChartData = (data) => ({
        labels: data.label,
        datasets: [{
            label: "Battery level",
            data: stats.percentage,
            backgroundColor: "rgb(34, 197, 94)",
            borderColor: "rgb(34, 197, 94)",
            borderWidth: 2
        }]
    });

    return (
        <div className="bg-stone-800 h-screen">
            <ReactChart type="line" data={mapChartData(stats)} options={chartOptions}/>
        </div>
    )
}

export default Stats
