import React from "react";
import { Brain, Activity, Info } from "lucide-react";
import "./Features.css"; // Import the Bootstrap-styled CSS

const Features = () => {
  return (
    <div className="features" id="features">
      <div className="feature-card">
        <Brain className="feature-icon" />
        <h3>Advanced AI Model</h3>
        <p>Powered by TensorFlow.js and COCO-SSD for accurate real-time object detection</p>
      </div>
      <div className="feature-card">
        <Activity className="feature-icon" />
        <h3>Real-Time Processing</h3>
        <p>Instant object detection and classification with live confidence scores</p>
      </div>
      <div className="feature-card">
        <Info className="feature-icon" />
        <h3>Privacy First</h3>
        <p>All processing happens locally in your browser - no data is sent to servers</p>
      </div>
    </div>
  );
};

export default Features;
