
import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturedEvents from './components/FeaturedEvents';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <FeaturedEvents />
    </div>
  );
}

export default App;
