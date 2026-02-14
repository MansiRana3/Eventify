import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(event.date);
      const now = new Date();
      const difference = eventDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        
        if (days > 0) {
          setTimeLeft(`${days} day${days > 1 ? 's' : ''} left`);
        } else if (hours > 0) {
          setTimeLeft(`${hours} hour${hours > 1 ? 's' : ''} left`);
        } else {
          setTimeLeft('Starting soon!');
        }
      } else {
        setTimeLeft('Event passed');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [event.date]);

  const isSoldOut = event.availableSeats === 0;
  const isLowSeats = event.availableSeats > 0 && event.availableSeats <= 20;

  return (
    <Link to={`/events/${event._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
        {/* Sold Out / Low Seats Badge */}
        {isSoldOut && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
            🔥 SOLD OUT
          </div>
        )}
        {!isSoldOut && isLowSeats && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
            ⚡ Only {event.availableSeats} left!
          </div>
        )}

        <img
          src={event.image}
          alt={event.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {event.category}
            </span>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-400 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-gray-600">
                {event.averageRating > 0 ? event.averageRating.toFixed(1) : 'New'} ({event.numReviews})
              </span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
            {event.name}
          </h3>

          <div className="space-y-1 text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-3 bg-indigo-50 text-indigo-700 text-sm font-semibold px-3 py-2 rounded-lg text-center">
            ⏰ {timeLeft}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-indigo-600">
              ₹{event.price.toLocaleString()}
            </span>
            {!isSoldOut && (
              <span className="text-sm text-gray-500">
                {event.availableSeats} seats
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;