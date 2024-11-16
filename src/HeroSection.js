import React from 'react';
import './App.css';

const HeroSection = () => (
  <header className="hero-section">
    <h2>Explore ChainTix</h2>
    <div className="search-bar">
      <input type="text" placeholder="Search for events, artists, or teams" />
      <button>Submit</button>
    </div>
  </header>
);

export default HeroSection;
