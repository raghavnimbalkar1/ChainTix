// src/components/FeaturedEvents.js
import React from 'react';
import EventCard from './EventCard';

const events = [
  { id: 1, name: 'The Weeknd', date: 'Fri, Dec 1 at 8:00 PM', price: '$100 - $500' },
  { id: 2, name: 'Kanye West', date: 'Sat, Dec 2 at 8:00 PM', price: '$150 - $700' },
  // Add more events here
];

const FeaturedEvents = () => (
  <section className="featured-events">
    <h2>Featured Events</h2>
    <div className="event-list">
      {events.map(event => <EventCard key={event.id} {...event} />)}
    </div>
  </section>
);

export default FeaturedEvents;
