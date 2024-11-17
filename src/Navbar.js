import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './Navbar.css';

function Navbar() {
  const [walletAddress, setWalletAddress] = useState(localStorage.getItem('walletAddress') || null);
  const [isConnecting, setIsConnecting] = useState(false); // For the connecting state
  const [errorMessage, setErrorMessage] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setIsConnecting(true); // Start the connecting animation
        setErrorMessage('');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const connectedAddress = accounts[0];
        setWalletAddress(connectedAddress);
        localStorage.setItem('walletAddress', connectedAddress); // Save address in localStorage
        setIsConnecting(false); // End the connecting animation
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        setErrorMessage('Failed to connect. Please try again.');
        setIsConnecting(false); // End the connecting animation even if it fails
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null); // Disconnect wallet
    localStorage.removeItem('walletAddress'); // Remove address from localStorage
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Wrap the ChainTix with Link to make it navigate to Home */}
        <Link to="/" className="logo-link">
          <img src="/file.png" alt="Logo" className="logo-image" />
          <h1>ChainTix</h1>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/events" className="nav-link">Events</Link>
        </li>
        <li>Creators</li>
        <li>Discover</li>
        <li>Create</li>
        <li>
          {!walletAddress ? (
            <button
              className={`connect-wallet ${isConnecting ? 'connecting' : ''}`}
              onClick={connectWallet}
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <div className="wallet-info">
              <span className="wallet-address">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
              <button className="disconnect-wallet" onClick={disconnectWallet}>
                Disconnect
              </button>
            </div>
          )}
        </li>
      </ul>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </nav>
  );
}

export default Navbar;
