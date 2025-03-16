import React, { useState } from "react";
import Analysis from "../Analysis/Analysis";
import Chart from "../Analysis/Chart"; // Import Chart Component
import "./ObjectDetector.css";

const ObjectDetector = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detections, setDetections] = useState([]);
  const [stats, setStats] = useState({ object_count: {}, fps: 0, total_detections: 0 });

  const handleStartDetection = () => {
    if (isDetecting) return;
    fetch("http://localhost:5000/start_detection", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setIsDetecting(true);
          setDetections([]);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleStopDetection = () => {
    fetch("http://localhost:5000/stop_detection", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setIsDetecting(false);
          setDetections(data.detections || []);
          setStats({
            object_count: data.object_count || {},
            fps: data.fps || 0,
            total_detections: data.total_detections || 0
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div id="detector">
      <div className="container mt-4 text-center">
        <h1>Real-Time Object Detection</h1>

        <div className="video-container">
          {isDetecting ? (
            <img src="http://localhost:5000/video_feed" alt="Detection Feed" className="video-feed" />
          ) : (
            <div className="placeholder-message">Detection is off. Click Start.</div>
          )}
          <button onClick={isDetecting ? handleStopDetection : handleStartDetection} className={`btn ${isDetecting ? "btn-danger" : "btn-primary"}`}>
            {isDetecting ? "Stop Detection" : "Start Detection"}
          </button>
        </div>
        {!isDetecting && detections.length > 0 ? (
          <>
            <Analysis detections={detections} />
            <Chart objectStats={stats.object_count} fps={stats.fps} total={stats.total_detections} />
          </>
        ) : (
          <p>No objects detected.</p>
        )}

      </div>
    </div>
  );
};

export default ObjectDetector;