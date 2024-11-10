// src/components/EventCard.js
import React from 'react';

const EventCard = ({ name, date, price }) => (
  <div className="event-card">
    <div className="event-image" />
    <div className="event-details">
      <h3>{name}</h3>
      <p>{date}</p>
      <p>{price}</p>
    </div>
  </div>
);

export default EventCard;
