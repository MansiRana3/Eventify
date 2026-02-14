import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold">
            Eventify
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-indigo-200 transition">
              Events
            </Link>

            {user ? (
              <>
                {user.role === 'host' && (
                  <Link
                    to="/host/events"
                    className="hover:text-indigo-200 transition"
                  >
                    My Events
                  </Link>
                )}
                <Link
                  to="/bookings"
                  className="hover:text-indigo-200 transition"
                >
                  My Bookings
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-indigo-200 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-indigo-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;