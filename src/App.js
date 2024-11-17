import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroSection from './HeroSection';
import FeaturedEvents from './components/FeaturedEvents';
import Events from './pages/Events';  // Import Events page
import Header from './components/Header'; // Import Header
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Global Header */}

        {/* Global Navbar */}
        <Navbar />

        <Routes>
          {/* Home Route - Displays the Home Page with static events */}
          <Route path="/" element={<><HeroSection /><FeaturedEvents /></>} />

          {/* Events Route - Displays the Events page with smart contract events */}
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
