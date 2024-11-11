import React, {useRef, useState} from 'react';
import EventCard from './EventCard';
import './FeaturedEvents.css';
import { useEffect } from 'react';

const FeaturedEvents = () => {
  const events = [
    {
      id: 1,
      image: '/weeknd.jpg', 
      title: 'The Weeknd Live',
      date: 'Fri, Dec 1 at 8:00 PM',
      price: '0.01 ETH - 1.2 ETH',
    },
    {
      id: 2,
      image: '/kanye.jpg', 
      title: 'Kanye West Concert',
      date: 'Sat, Dec 2 at 8:00 PM',
      price: '0.01 ETH - 1.2 ETH ',
    },
    {
      id: 3,
      image: '/billie.jpg', 
      title: 'Billie Eilish Tour',
      date: 'Sun, Dec 3 at 7:00 PM',
      price: '0.01 ETH - 1 ETH',
    },
    {
      id: 4,
      image: '/wos.webp', 
      title: 'Music of the Spheres Tour',
      date: 'Multiple Dates',
      price: 'SOLD OUT',
    },
    {
      id: 5,
      image: '/kishore.jpg', 
      title: 'Tribute to Kishore Kumar',
      date: 'Mon, Oct 13 at 4:45 PM',
      price: 'Free',
    },
    {
      id: 6,
      image: '/lolla.webp', 
      title: 'Lollapalooza 2025 India',
      date: 'Fri, Mar 25 at 5:00 PM',
      price: 'To Be Announced',
    },
    {
      id: 7,
      image: '/nbhd.jpg', 
      title: 'The Neighbourhood Tour',
      date: 'Wed, Feb 08 at 7:30 PM',
      price: '0.01 ETH - 0.5 ETH',
    },
    {
      id: 8,
      image: '/martin.avif', 
      title: "Martin Garrix - World's Biggest Holi",
      date: 'Wed, Feb 08 at 7:30 PM',
      price: '0.01 ETH - 0.5 ETH',
    },

    
  ];

  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    setIsAtStart(scrollRef.current.scrollLeft <= 400);
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    setIsAtStart(false);
  };

  return (
    <section className="featured-events">
      <h2>Featured Events</h2>
      <div className="scroll-container">
        {!isAtStart && (
          <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
        )}
        <div className="events-list" ref={scrollRef}>
          {events.map(event => (
            <EventCard key={event.id} image={event.image} title={event.title} date={event.date} price={event.price} />
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
      </div>
    </section>
  );
};

export default FeaturedEvents;