// src/App.js
import React from 'react';
import Navbar from './Navbar';
import './App.css';

function App() {
  return (
    
    <div className="app">
      <Navbar />
      <header className="hero-section">
        <h2>Explore ChainTix</h2>
        <div className="search-bar">
          <input type="text" placeholder="Search for events, artists, or teams" />
          <button>Submit</button>
        </div>
      </header>

      <section className="featured-events">
        <h3>Featured Events</h3>
        <div className="event-card">
          <h4>The Weekend</h4>
          <p>Fri, Dec 1 at 8:00 PM</p>
          <p>$100 - $500</p>
        </div>

      </section>
      <section className="popular-collections">
        <h3>Popular Collections</h3>
        <div className='event-card'>
          <h4>The Weekend</h4>
          <p>Fri, Dec 3 at 8:30 PM</p>
          <p>$80 - $100</p>
        </div>

      </section>
    </div>
  );
}

export default App;
