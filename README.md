# **Eventify**

**Live Project:** https://eventify-fe-three.vercel.app

A full-stack event booking platform where hosts can create and manage events, and users can discover and book tickets.

## <u>**About**</u>

Eventify is a web application I built to learn full-stack development. It lets event organizers create and manage their events while giving attendees an easy way to find and book tickets. Think of it as a simplified Eventbrite clone with core booking functionality.

The platform handles two types of users: hosts who create events, and regular users who browse and book them. Each gets their own dashboard to manage their events or bookings.

## <u>**Features**</u>

**User Side:**
- Browse events with search and filtering (by category, price range)
- View detailed event information including location, date, and available seats
- Book tickets for events
- Dashboard showing all your bookings (upcoming and past)
- Leave reviews and ratings for events you've attended
- Countdown timers showing when events start
- Cancel bookings when needed

**Host Side:**
- Create new events with all necessary details
- Edit or delete your events
- Dashboard with stats (total events, bookings, revenue)
- View all bookings for your events
- Track which events are performing well

**Technical Features:**
- JWT authentication for secure login
- Role-based access (different dashboards for users vs hosts)
- Protected routes so only hosts can create/edit events
- Real-time search as you type
- Sorting options (by date, price, popularity)
- Responsive design that works on mobile
- Loading states and toast notifications for better UX
- Shows "sold out" badges when events are full

## <u>**Screenshots**</u>

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/9155115b-2942-4ec9-b5be-77e8e2d8cecf" />
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/1d43871b-6a08-46d9-8bc3-259be87f430e" />
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/e502a195-ddd9-4072-be1c-765b90de81e1" />

## <u>**Tech Stack**</u>

**Frontend:**
- React.js with hooks (useState, useEffect, useContext)
- React Router for navigation
- Context API for state management
- Axios for API calls
- Tailwind CSS for styling

**Backend:**
- Node.js + Express.js
- MongoDB for database
- JWT for authentication
- bcrypt for password hashing

## <u>**Getting Started**</u>

### What You'll Need
- Node.js (v18 or higher)
- MongoDB (either local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repo:
```bash
git clone https://github.com/yourusername/eventify.git
cd eventify
```

2. Set up the backend:
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

3. Set up the frontend:
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend folder:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Run both servers:

Backend (from backend folder):
```bash
npm start
```

Frontend (from frontend folder, in a new terminal):
```bash
npm start
```

The app should open at `http://localhost:3000`

## <u>**How It Works**</u>

**For Users:**
1. Sign up with the "User" role
2. Browse events on the home page or search for specific ones
3. Click on an event to see full details and reviews
4. Book tickets (as long as seats are available)
5. Check your dashboard to see all bookings
6. Leave reviews after attending events

**For Hosts:**
1. Sign up with the "Host" role
2. Create events from your dashboard
3. Set event details like date, price, category, and available seats
4. Edit or delete events as needed
5. See booking statistics and track revenue

## <u>**API Endpoints**</u>

### Auth
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login

### Events
- `GET /api/events` - Get all events (supports query params: search, category, minPrice, maxPrice, sort)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (host only, requires auth)
- `PUT /api/events/:id` - Update event (host only, requires auth)
- `DELETE /api/events/:id` - Delete event (host only, requires auth)

### Bookings
- `POST /api/bookings` - Create booking (requires auth)
- `GET /api/bookings/my-bookings` - Get user's bookings (requires auth)
- `GET /api/bookings/host-bookings` - Get bookings for host's events (requires auth)
- `DELETE /api/bookings/:id` - Cancel booking (requires auth)

### Reviews
- `POST /api/reviews` - Add review (requires auth)
- `GET /api/reviews/event/:eventId` - Get reviews for an event

All authenticated endpoints require a JWT token in the Authorization header: `Bearer <token>`

## <u>**Project Structure**</u>

```
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
```

## <u>**Future Improvements**</u>

Things I'd like to add:
- Payment integration (Stripe)
- Email notifications for bookings
- Image upload for events
- QR code tickets
- Admin dashboard
- Event recommendations
- Calendar export
- Dark mode

## <u>**What I Learned**</u>

Building this project helped me understand:
- How to structure a full-stack application
- JWT authentication and protected routes
- Working with MongoDB and designing schemas
- State management with Context API
- Building RESTful APIs
- Creating responsive UIs with Tailwind

## <u>**Contact**</u>

Feel free to reach out if you have questions or suggestions!

- **Email:** ranamansi2101@gmail.com
- **Live Project:** https://eventify-fe-three.vercel.app
