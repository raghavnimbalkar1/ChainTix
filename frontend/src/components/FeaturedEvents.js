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
      location: 'Mumbai',
    },
    {
      id: 2,
      image: '/kanye.jpg', 
      title: 'Kanye West Concert',
      date: 'Sat, Dec 2 at 8:00 PM',
      location: 'Mumbai',
    },
    {
      id: 3,
      image: '/billie.jpg', 
      title: 'Billie Eilish Tour',
      date: 'Sun, Dec 3 at 7:00 PM',
      location: 'Multiple Venues',
    },
    {
      id: 4,
      image: '/wos.jpg', 
      title: 'Music of the Spheres Tour',
      date: 'Sat, Jan 25 at 5:00 PM',
      location: 'Multiple Venues',
    },
    {
      id: 5,
      image: '/kishore.jpg', 
      title: 'Tribute to Kishore Kumar',
      date: 'Mon, Oct 13 at 4:45 PM',
      location: 'High Spirits Cafe, Pune',
    },
    {
      id: 6,
      image: '/lolla.webp', 
      title: 'Lollapalooza 2025 India',
      date: 'Fri, Mar 25 at 5:00 PM',
      location: 'To Be Announced',
    },
    {
      id: 7,
      image: '/nbhd.jpg', 
      title: 'The Neighbourhood Tour',
      date: 'Wed, Feb 08 at 7:30 PM',
      location: 'To Be Announced',
    },
    {
      id: 8,
      image: '/martin.avif', 
      title: "Martin Garrix - World's Biggest Holi",
      date: 'Wed, Feb 08 at 7:30 PM',
      location: 'Pune',
    },
    {
      id: 9,
      image: '/dti.jpg', 
      title: "Dress to Impress - 'Roblox'",
      date: 'Wed, Nov 13 at 7:00 PM',
      location: 'Online',
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
            <EventCard key={event.id} image={event.image} title={event.title} date={event.date} location={event.location} />
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
      </div>
    </section>
  );
};

export default FeaturedEvents;