import React from "react";
import "./Hero.css";
import { FaEye } from "react-icons/fa"; // Importing Eye icon

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-icon">
          <FaEye className="eye-icon" /> &nbsp; &nbsp;
          <h1 className="hero-title">ObjectifyAI</h1>
        </div>
        <h1 className="hero-title">Real-Time Object Recognition</h1>
        <p className="hero-text">Detect and analyze objects in real time with AI.</p>
        <br/>
        <p className="hero-text">
          Experience real-time object detection powered by advanced AI.
          Simply enable your camera and watch as our system identifies objects in your environment instantly.
        </p>
        <br/>
        <p className="hero-text">
          Start exploring the future of AI vision today!
        </p>
        <a href="#detector" className="hero-btn">Start Detecting</a>
      </div>
    </section>
  );
};

export default Hero;


