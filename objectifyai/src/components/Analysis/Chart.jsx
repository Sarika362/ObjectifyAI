import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import "./Chart.css"; // Import external CSS

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ objectStats, fps, total }) => {
  const labels = Object.keys(objectStats);
  const data = Object.values(objectStats);

  console.log("Object Stats:", objectStats);
  console.log("Labels:", labels);
  console.log("Data:", data);

  // Handle empty chart case
  if (labels.length === 0 || data.length === 0) {
    return <p className="no-detection-message">No objects detected.</p>;
  }

  return (
    <div className="chart-container">
      <h2 className="chart-title">Detection Statistics</h2>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Object Count",
              data,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderRadius: 5,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,  /* ✅ Prevent infinite height */
          scales: {
            x: {
              ticks: { color: "#fff", font: { size: 14 } },  /* ✅ Clear X-axis */
            },
            y: {
              ticks: { color: "#fff", font: { size: 14 } },  /* ✅ Clear Y-axis */
            },
          },
          plugins: {
            legend: {
              labels: { color: "#fff", font: { size: 14 } }, /* ✅ Clear Legend */
            },
          },
        }}
      />
      <br/>
      <br/>

      <div className="chart-footer">
        <span><p>FPS: {fps}</p>
        <p>Total Detections: {total}</p></span>
      </div>
    </div>
  );
};

export default Chart;
