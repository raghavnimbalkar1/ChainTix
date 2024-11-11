// src/pages/Home.js
import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FeaturedEvents from '../components/FeaturedEvents';

const Home = () => (
  <div>
    <Header />
    <div className="main-content">
      <SearchBar />
      <FeaturedEvents />
    </div>
  </div>
);

export default Home;
