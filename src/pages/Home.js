import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturedEvents from './components/FeaturedEvents';
import '../App.css';

function Home() {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <FeaturedEvents />
    </div>
  );
}

export default Home;
