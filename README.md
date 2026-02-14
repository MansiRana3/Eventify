Eventify ----LINK TO LIVE PROJECT-https://eventify-fe-three.vercel.app


A full-stack event booking platform where hosts can create and manage events, and users can discover and book tickets.


About
Eventify is a web application I built to learn full-stack development. It lets event organizers create and manage their events while giving attendees an easy way to find and book tickets. Think of it as a simplified Eventbrite clone with core booking functionality.
The platform handles two types of users: hosts who create events, and regular users who browse and book them. Each gets their own dashboard to manage their events or bookings.


Features

User Side:
Browse events with search and filtering (by category, price range)
View detailed event information including location, date, and available seats
Book tickets for events
Dashboard showing all your bookings (upcoming and past)
Leave reviews and ratings for events you've attended
Countdown timers showing when events start
Cancel bookings when needed


Host Side:
Create new events with all necessary details
Edit or delete your events
Dashboard with stats (total events, bookings, revenue)
View all bookings for your events
Track which events are performing well

Technical Features:

JWT authentication for secure login
Role-based access (different dashboards for users vs hosts)
Protected routes so only hosts can create/edit events
Real-time search as you type
Sorting options (by date, price, popularity)
Responsive design that works on mobile
Loading states and toast notifications for better UX
Shows "sold out" badges when events are full

Screenshots
<img width="2041" height="1020" alt="image" src="https://github.com/user-attachments/assets/333a6410-129b-49a2-babf-1a0667a15649" />


Tech Stack
Frontend:

React.js with hooks (useState, useEffect, useContext)
React Router for navigation
Context API for state management
Axios for API calls
Tailwind CSS for styling

Backend:

Node.js + Express.js
MongoDB for database
JWT for authentication
bcrypt for password hashing

Getting Started
What You'll Need

Node.js (v18 or higher)
MongoDB (either local or MongoDB Atlas)
npm or yarn

Installation

Clone the repo:

bashgit clone https://github.com/yourusername/eventify.git
cd eventify

Set up the backend:

bashcd backend
npm install
Create a .env file in the backend folder:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Set up the frontend:

bashcd ../frontend
npm install
Create a .env file in the frontend folder:
REACT_APP_API_URL=http://localhost:5000/api

Run both servers:

Backend (from backend folder):
bashnpm start
Frontend (from frontend folder, in a new terminal):
bashnpm start
The app should open at http://localhost:3000
How It Works
For Users:

Sign up with the "User" role
Browse events on the home page or search for specific ones
Click on an event to see full details and reviews
Book tickets (as long as seats are available)
Check your dashboard to see all bookings
Leave reviews after attending events

For Hosts:

Sign up with the "Host" role
Create events from your dashboard
Set event details like date, price, category, and available seats
Edit or delete events as needed
See booking statistics and track revenue

API Endpoints
Auth

POST /api/auth/register - Create new account
POST /api/auth/login - Login

Events

GET /api/events - Get all events (supports query params: search, category, minPrice, maxPrice, sort)
GET /api/events/:id - Get single event
POST /api/events - Create event (host only, requires auth)
PUT /api/events/:id - Update event (host only, requires auth)
DELETE /api/events/:id - Delete event (host only, requires auth)

Bookings

POST /api/bookings - Create booking (requires auth)
GET /api/bookings/my-bookings - Get user's bookings (requires auth)
GET /api/bookings/host-bookings - Get bookings for host's events (requires auth)
DELETE /api/bookings/:id - Cancel booking (requires auth)

Reviews

POST /api/reviews - Add review (requires auth)
GET /api/reviews/event/:eventId - Get reviews for an event

All authenticated endpoints require a JWT token in the Authorization header: Bearer <token>
Project Structure
eventify/
├── backend/
│   ├── controllers/        # Request handlers
│   ├── models/            # Database schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & error handling
│   └── server.js          # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth context
│   │   └── utils/         # API calls & helpers
│   └── public/
│
└── README.md



Future Improvements
Payment integration (Stripe)
Email notifications for bookings
QR code tickets
Event recommendations
Calendar export


What I Learned
Building this project helped me understand:
How to structure a full-stack application
JWT authentication and protected routes
Working with MongoDB and designing schemas
State management with Context API
Building RESTful APIs
Creating responsive UIs with Tailwind

Contact
Feel free to reach out if you have questions or suggestions!

Email: ranamansi2101@gmail.com
LINK TO LIVE PROJECT-https://eventify-fe-three.vercel.app
