// src/Navbar.js
import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/file.png" alt="" className="logo-image" />
        <h1>ChainTix</h1>
      </div>
      <ul className="navbar-links">
        <li>Events</li>
        <li>Creators</li>
        <li>Discover</li>
        <li>Create</li>
        <button className="connect-wallet">Connect Wallet</button>
      </ul>
    </nav>
  );
}

export default Navbar;
