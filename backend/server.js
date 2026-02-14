const express = require('express');
const cors = require('cors');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// In-memory data storage (for demo)
let users = [];
let events = [];
let bookings = [];
// Demo Events Data
events = [
  {
    _id: 'event1',
    name: 'Coldplay Music of the Spheres World Tour',
    description: 'Experience the magic of Coldplay live! Join us for an unforgettable night of music, lights, and pure energy. Featuring hits like "Yellow", "Fix You", "Viva La Vida" and songs from their latest album.',
    category: 'Music',
    date: new Date('2025-03-15T19:00:00'),
    location: 'DY Patil Stadium, Mumbai',
    price: 2500,
    availableSeats: 150,
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop',
    host: { _id: 'host1', name: 'BookMyShow', email: 'host@eventify.com' },
    reviews: [
      {
        _id: 'rev1',
        user: 'user1',
        name: 'Priya Sharma',
        rating: 5,
        comment: 'Best concert ever! The atmosphere was electric!',
        createdAt: new Date('2025-02-10')
      },
      {
        _id: 'rev2',
        user: 'user2',
        name: 'Rahul Verma',
        rating: 5,
        comment: 'Amazing experience. Totally worth the price!',
        createdAt: new Date('2025-02-11')
      }
    ],
    averageRating: 5,
    numReviews: 2,
    createdAt: new Date('2025-01-20')
  },
  {
    _id: 'event2',
    name: 'AR Rahman Live in Concert',
    description: 'The Mozart of Madras returns! Experience AR Rahman performing his greatest hits from Bollywood and beyond. A musical journey spanning three decades of iconic compositions.',
    category: 'Music',
    date: new Date('2025-04-20T18:30:00'),
    location: 'Jawaharlal Nehru Stadium, Delhi',
    price: 3000,
    availableSeats: 200,
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop',
    host: { _id: 'host1', name: 'BookMyShow', email: 'host@eventify.com' },
    reviews: [],
    averageRating: 0,
    numReviews: 0,
    createdAt: new Date('2025-01-25')
  },
  {
    _id: 'event3',
    name: 'IPL 2025 Final Match',
    description: 'Witness cricket history! The grand finale of IPL 2025. Two teams battle it out for the ultimate glory. Be part of the roaring crowd and electrifying atmosphere!',
    category: 'Sports',
    date: new Date('2025-05-28T19:30:00'),
    location: 'Wankhede Stadium, Mumbai',
    price: 5000,
    availableSeats: 80,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop',
    host: { _id: 'host2', name: 'BCCI', email: 'sports@eventify.com' },
    reviews: [
      {
        _id: 'rev3',
        user: 'user3',
        name: 'Arjun Patel',
        rating: 4,
        comment: 'Great seats, amazing match atmosphere!',
        createdAt: new Date('2025-02-12')
      }
    ],
    averageRating: 4,
    numReviews: 1,
    createdAt: new Date('2025-02-01')
  },
  {
    _id: 'event4',
    name: 'Manchester United vs Real Madrid - Friendly',
    description: 'Football legends clash! Watch Man United take on Real Madrid in this exclusive friendly match. See world-class players in action at India\'s biggest stadium.',
    category: 'Sports',
    date: new Date('2025-06-10T17:00:00'),
    location: 'Salt Lake Stadium, Kolkata',
    price: 4500,
    availableSeats: 120,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
    host: { _id: 'host2', name: 'BCCI', email: 'sports@eventify.com' },
    reviews: [],
    averageRating: 0,
    numReviews: 0,
    createdAt: new Date('2025-02-05')
  },
  {
    _id: 'event5',
    name: 'Zakir Khan - Tathastu Tour',
    description: 'India\'s favorite storyteller returns! Join Zakir Khan for an evening filled with hilarious anecdotes, relatable humor, and unforgettable moments. "Sakht launda" guaranteed!',
    category: 'Comedy',
    date: new Date('2025-03-25T20:00:00'),
    location: 'Phoenix Marketcity, Bangalore',
    price: 999,
    availableSeats: 180,
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&h=600&fit=crop',
    host: { _id: 'host3', name: 'Comedy Central', email: 'comedy@eventify.com' },
    reviews: [
      {
        _id: 'rev4',
        user: 'user4',
        name: 'Sneha Iyer',
        rating: 5,
        comment: 'Laughed till my stomach hurt! Best comedy show!',
        createdAt: new Date('2025-02-13')
      },
      {
        _id: 'rev5',
        user: 'user5',
        name: 'Karan Malhotra',
        rating: 5,
        comment: 'Zakir bhai is a legend! Must watch!',
        createdAt: new Date('2025-02-13')
      }
    ],
    averageRating: 5,
    numReviews: 2,
    createdAt: new Date('2025-02-08')
  },
  {
    _id: 'event6',
    name: 'Kenny Sebastian - The Most Interesting Person',
    description: 'Kenny is back with brand new material! Fresh perspectives, witty observations, and that classic Kenny charm. Perfect for a fun evening with friends and family.',
    category: 'Comedy',
    date: new Date('2025-04-12T19:00:00'),
    location: 'NCPA, Mumbai',
    price: 1200,
    availableSeats: 100,
    image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&h=600&fit=crop',
    host: { _id: 'host3', name: 'Comedy Central', email: 'comedy@eventify.com' },
    reviews: [],
    averageRating: 0,
    numReviews: 0,
    createdAt: new Date('2025-02-10')
  },
  {
    _id: 'event7',
    name: 'Google I/O Extended India 2025',
    description: 'Join developers from across India for Google I/O Extended! Learn about the latest in AI, Android, Cloud, and more. Featuring workshops, tech talks, and networking opportunities.',
    category: 'Tech',
    date: new Date('2025-05-15T09:00:00'),
    location: 'Bengaluru International Exhibition Centre',
    price: 499,
    availableSeats: 300,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    host: { _id: 'host4', name: 'Google DevFest', email: 'tech@eventify.com' },
    reviews: [
      {
        _id: 'rev6',
        user: 'user6',
        name: 'Vikram Singh',
        rating: 5,
        comment: 'Amazing insights! Great networking opportunity.',
        createdAt: new Date('2025-02-14')
      }
    ],
    averageRating: 5,
    numReviews: 1,
    createdAt: new Date('2025-02-12')
  },
  {
    _id: 'event8',
    name: 'AI & Machine Learning Summit 2025',
    description: 'India\'s premier AI conference! Industry leaders share insights on LLMs, Computer Vision, and the future of AI. Includes hands-on workshops and startup showcases.',
    category: 'Tech',
    date: new Date('2025-06-22T10:00:00'),
    location: 'Hyderabad International Convention Centre',
    price: 2999,
    availableSeats: 250,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    host: { _id: 'host4', name: 'Google DevFest', email: 'tech@eventify.com' },
    reviews: [],
    averageRating: 0,
    numReviews: 0,
    createdAt: new Date('2025-02-14')
  },
  {
    _id: 'event9',
    name: 'India Art Fair 2025',
    description: 'South Asia\'s leading art fair returns! Explore contemporary and modern art from over 100 galleries. Meet artists, attend talks, and discover India\'s vibrant art scene.',
    category: 'Arts',
    date: new Date('2025-03-28T11:00:00'),
    location: 'NSIC Grounds, New Delhi',
    price: 800,
    availableSeats: 400,
    image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&h=600&fit=crop',
    host: { _id: 'host5', name: 'Art India', email: 'arts@eventify.com' },
    reviews: [
      {
        _id: 'rev7',
        user: 'user7',
        name: 'Meera Kapoor',
        rating: 4,
        comment: 'Beautiful collection! A must-visit for art lovers.',
        createdAt: new Date('2025-02-15')
      }
    ],
    averageRating: 4,
    numReviews: 1,
    createdAt: new Date('2025-02-15')
  },
  {
    _id: 'event10',
    name: 'Classical Dance Festival - Bharatanatyam Special',
    description: 'Celebrate India\'s rich cultural heritage! Renowned dancers perform traditional Bharatanatyam. An evening of grace, storytelling, and classical music.',
    category: 'Arts',
    date: new Date('2025-04-18T18:00:00'),
    location: 'Kamani Auditorium, Delhi',
    price: 600,
    availableSeats: 150,
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&h=600&fit=crop',
    host: { _id: 'host5', name: 'Art India', email: 'arts@eventify.com' },
    reviews: [],
    averageRating: 0,
    numReviews: 0,
    createdAt: new Date('2025-02-16')
  }
];

// Helper function to generate IDs
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// AUTH ROUTES
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role = 'user', phone } = req.body;
  
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const user = {
    id: generateId(),
    name,
    email,
    password, // In real app, this would be hashed
    role,
    phone,
    avatar: 'https://via.placeholder.com/150'
  };

  users.push(user);
  
  const token = 'demo_token_' + user.id;
  
  res.status(201).json({
    success: true,
    token,
    user: { id: user.id, name, email, role, phone, avatar: user.avatar }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = 'demo_token_' + user.id;
  
  res.status(200).json({
    success: true,
    token,
    user: { id: user.id, name: user.name, email, role: user.role, phone: user.phone, avatar: user.avatar }
  });
});

// Middleware to get current user from token
const getCurrentUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }
  
  const userId = token.replace('demo_token_', '');
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }
  
  req.user = user;
  next();
};

app.get('/api/auth/me', getCurrentUser, (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});

app.put('/api/auth/updateprofile', getCurrentUser, (req, res) => {
  const { name, email, phone } = req.body;
  const user = users.find(u => u.id === req.user.id);
  
  user.name = name;
  user.email = email;
  user.phone = phone;
  
  res.status(200).json({ success: true, data: user });
});

// EVENT ROUTES
 // EVENT ROUTES
app.get('/api/events', (req, res) => {
  const { category, search, sortBy, minPrice, maxPrice } = req.query;
  let filteredEvents = [...events];
  
  // Filter by category
  if (category) {
    filteredEvents = filteredEvents.filter(e => e.category === category);
  }
  
  // Search by name or location
  if (search) {
    filteredEvents = filteredEvents.filter(e => 
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Filter by price range
  if (minPrice) {
    filteredEvents = filteredEvents.filter(e => e.price >= Number(minPrice));
  }
  if (maxPrice) {
    filteredEvents = filteredEvents.filter(e => e.price <= Number(maxPrice));
  }
  
  // Sort events
  if (sortBy === 'price-low') {
    filteredEvents.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredEvents.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'date') {
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortBy === 'popularity') {
    filteredEvents.sort((a, b) => b.averageRating - a.averageRating || b.numReviews - a.numReviews);
  } else {
    // Default: Show trending/featured first (high ratings + reviews)
    filteredEvents.sort((a, b) => {
      const scoreA = (a.averageRating * a.numReviews) || 0;
      const scoreB = (b.averageRating * b.numReviews) || 0;
      return scoreB - scoreA || new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
  
  res.status(200).json({ success: true, count: filteredEvents.length, data: filteredEvents });
});

app.get('/api/events/:id', (req, res) => {
  const event = events.find(e => e._id === req.params.id);
  
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  
  res.status(200).json({ success: true, data: event });
});

app.post('/api/events', getCurrentUser, (req, res) => {
  if (req.user.role !== 'host') {
    return res.status(403).json({ success: false, message: 'Only hosts can create events' });
  }

  const event = {
    _id: generateId(),
    ...req.body,
    host: { _id: req.user.id, name: req.user.name, email: req.user.email },
    image: req.body.image || 'https://via.placeholder.com/400x300',
    reviews: [],
    averageRating: 0,
    numReviews: 0,
    createdAt: new Date()
  };

  events.push(event);
  
  res.status(201).json({ success: true, data: event });
});

app.put('/api/events/:id', getCurrentUser, (req, res) => {
  const event = events.find(e => e._id === req.params.id);
  
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  
  if (event.host._id !== req.user.id) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  Object.assign(event, req.body);
  
  res.status(200).json({ success: true, data: event });
});

app.delete('/api/events/:id', getCurrentUser, (req, res) => {
  const eventIndex = events.findIndex(e => e._id === req.params.id);
  
  if (eventIndex === -1) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  
  if (events[eventIndex].host._id !== req.user.id) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  events.splice(eventIndex, 1);
  
  res.status(200).json({ success: true, data: {} });
});

app.get('/api/events/host/myevents', getCurrentUser, (req, res) => {
  const hostEvents = events.filter(e => e.host._id === req.user.id);
  res.status(200).json({ success: true, count: hostEvents.length, data: hostEvents });
});

app.post('/api/events/:id/reviews', getCurrentUser, (req, res) => {
  const event = events.find(e => e._id === req.params.id);
  
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  const alreadyReviewed = event.reviews.find(r => r.user === req.user.id);
  
  if (alreadyReviewed) {
    return res.status(400).json({ success: false, message: 'You have already reviewed this event' });
  }

  const review = {
    _id: generateId(),
    user: req.user.id,
    name: req.user.name,
    rating: Number(req.body.rating),
    comment: req.body.comment,
    createdAt: new Date()
  };

  event.reviews.push(review);
  event.numReviews = event.reviews.length;
  event.averageRating = event.reviews.reduce((acc, r) => r.rating + acc, 0) / event.reviews.length;

  res.status(201).json({ success: true, message: 'Review added' });
});

// BOOKING ROUTES
app.post('/api/bookings', getCurrentUser, (req, res) => {
  const { eventId, quantity } = req.body;
  const event = events.find(e => e._id === eventId);
  
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  if (event.availableSeats < quantity) {
    return res.status(400).json({ success: false, message: 'Not enough seats available' });
  }

  const booking = {
    _id: generateId(),
    user: req.user.id,
    event: event,
    quantity,
    totalPrice: event.price * quantity,
    status: 'confirmed',
    bookingDate: new Date(),
    createdAt: new Date()
  };

  event.availableSeats -= quantity;
  bookings.push(booking);

  res.status(201).json({ success: true, data: booking });
});

app.get('/api/bookings/mybookings', getCurrentUser, (req, res) => {
  const userBookings = bookings.filter(b => b.user === req.user.id);
  res.status(200).json({ success: true, count: userBookings.length, data: userBookings });
});

app.get('/api/bookings/:id', getCurrentUser, (req, res) => {
  const booking = bookings.find(b => b._id === req.params.id);
  
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }
  
  if (booking.user !== req.user.id) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  res.status(200).json({ success: true, data: booking });
});

app.put('/api/bookings/:id/cancel', getCurrentUser, (req, res) => {
  const booking = bookings.find(b => b._id === req.params.id);
  
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }
  
  if (booking.user !== req.user.id) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  if (booking.status === 'cancelled') {
    return res.status(400).json({ success: false, message: 'Booking is already cancelled' });
  }

  booking.status = 'cancelled';
  const event = events.find(e => e._id === booking.event._id);
  if (event) {
    event.availableSeats += booking.quantity;
  }

  res.status(200).json({ success: true, data: booking });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Eventify API is running...' });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ No database required - using in-memory storage for demo`);
});