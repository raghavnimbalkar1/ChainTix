import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedEvents from './components/FeaturedEvents';
import '../App.css';

function Home() {
  return (
    <div className="home">
      <Navbar />
      <HeroSection />
      <FeaturedEvents />
    </div>
  );
}

export default Home;
