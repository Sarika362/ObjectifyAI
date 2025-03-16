// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import ObjectDetector from "./components/ObjectDetector/ObjectDetector";
import Navbar from "./components/Header/Navbar";

function App() {
  const [detections, setDetections] = useState([]);
  
  return (
    <Router>
      <Navbar />
      <main className="min-vh-100 bg-dark text-light">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
                <ObjectDetector setDetections={setDetections} />
              </>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;