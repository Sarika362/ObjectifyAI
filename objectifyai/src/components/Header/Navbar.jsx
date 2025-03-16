import React from "react";
import { Eye, Github } from "lucide-react";
import "./Navbar.css"; // Import external CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo */}
        <div className="navbar-logo">
          <Eye className="icon" />
          <span>ObjectifyAI</span>
        </div>

        {/* Right: Navigation Links */}
        <div className="navbar-links">
          <a href="#features">Features</a>
          <a href="#detector">Detector</a>
          <a href="#analysis">Analysis</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="github-link">
            <Github className="icon-sm" />
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
