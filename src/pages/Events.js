import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import EventCard from '../components/EventCard';
import '../components/FeaturedEvents.css';
import '../App.css'

const Events = () => {
  const [contractEvents, setContractEvents] = useState([]);

  useEffect(() => {
    const fetchEventsFromContract = async () => {
      if (window.ethereum) {
        // Use ethers.providers.Web3Provider for newer ethers versions
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contractABI = [
          "function getEvent(uint index) public view returns (string, uint256, uint256, string, string, string)",
          "function getEventCount() public view returns (uint256)"
        ];
        const contractAddress = "YOUR_SMART_CONTRACT_ADDRESS"; // Replace with your contract address
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        try {
          const eventCount = await contract.getEventCount();
          const fetchedEvents = [];

          for (let i = 0; i < eventCount; i++) {
            const event = await contract.getEvent(i);
            fetchedEvents.push({
              title: event[0],
              cost: event[1],
              tickets: event[2],
              date: event[3],
              time: event[4],
              location: event[5],
            });
          }

          setContractEvents(fetchedEvents);
        } catch (error) {
          console.error("Error fetching events from smart contract:", error);
        }
      } else {
        console.error("Ethereum wallet is not available.");
      }
    };

    fetchEventsFromContract();
  }, []);

  return (
    <section className="featured-events">
      <h2>Smart Contract Events</h2>
      <div className="events-list">
        {contractEvents.length > 0 ? (
          contractEvents.map((event, index) => (
            <EventCard
              key={index}
              image={event.image || '/default.jpg'} // Default image if none
              title={event.title}
              date={`${event.date} at ${event.time}`}
              location={event.location}
            />
          ))
        ) : (
          <p>Loading events...</p>
        )}
      </div>
    </section>
  );
};

export default Events;
