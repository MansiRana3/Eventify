import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetails from './pages/EventDetails';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import HostEvents from './pages/HostEvents';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';

// Protected Route Component
const ProtectedRoute = ({ children, hostOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (hostOnly && user.role !== 'host') {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events/:id" element={<EventDetails />} />
            
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/host/events"
              element={
                <ProtectedRoute hostOnly={true}>
                  <HostEvents />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/host/create-event"
              element={
                <ProtectedRoute hostOnly={true}>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/host/edit-event/:id"
              element={
                <ProtectedRoute hostOnly={true}>
                  <EditEvent />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;