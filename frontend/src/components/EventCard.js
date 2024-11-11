import React from 'react';
import './EventCard.css';

const EventCard = ({ image, title, date, price }) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} className="event-image" />
      <div className="event-info">
        <h3>{title}</h3>
        <p>{date}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default EventCard;
