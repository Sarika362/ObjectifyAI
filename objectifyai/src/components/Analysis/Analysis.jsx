import React from "react";
import "./Analysis.css"; // Import external CSS

const Analysis = ({ detections }) => {
  return (
    <section id="analysis" className="analysis-section">
      <div className="analysis-container">
        <h2 className="analysis-title">Analysis</h2>
        {detections.length === 0 ? (
          <p className="no-detection-message">No objects detected.</p>
        ) : (
          <ul className="analysis-list">
            {detections.map((detection, index) => (
              <li key={index} className="analysis-item">
                {detection.label}: {detection.confidence ? detection.confidence.toFixed(2) : "N/A"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Analysis;
