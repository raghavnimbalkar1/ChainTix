// src/components/Header.js
import React from 'react';

const Header = () => (
  <header className="header">
    <div className="logo">ChainTix</div>
    <nav>
      <a href="/">Events</a>
      <a href="/">Creators</a>
      <a href="/">Discover</a>
      <a href="/">Create</a>
      <button className="connect-wallet">Connect Wallet</button>
    </nav>
  </header>
);

export default Header;
