import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import EventCard from '../components/EventCard';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Music', 'Sports', 'Comedy', 'Tech', 'Arts'];

  useEffect(() => {
    fetchEvents();
  }, [category, search, sortBy, minPrice, maxPrice]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      let url = '/events?';
      if (category && category !== 'All') {
        url += `category=${category}&`;
      }
      if (search) {
        url += `search=${search}&`;
      }
      if (sortBy) {
        url += `sortBy=${sortBy}&`;
      }
      if (minPrice) {
        url += `minPrice=${minPrice}&`;
      }
      if (maxPrice) {
        url += `maxPrice=${maxPrice}&`;
      }
      const res = await api.get(url);
      setEvents(res.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setCategory('');
    setSearch('');
    setSortBy('');
    setMinPrice('');
    setMaxPrice('');
    toast.success('Filters cleared!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover. Book. Experience.
          </h1>
          <p className="text-xl text-indigo-100">
           Explore exciting events, book tickets instantly, and create memories that last.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="🔍 Search events or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Sort: Featured</option>
              <option value="popularity">Sort: Popularity</option>
              <option value="date">Sort: Date</option>
              <option value="price-low">Sort: Price (Low to High)</option>
              <option value="price-high">Sort: Price (High to Low)</option>
            </select>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition whitespace-nowrap"
            >
              {showFilters ? '✕ Hide Filters' : '⚙️ More Filters'}
            </button>
          </div>

          {/* Price Filter (Collapsible) */}
          {showFilters && (
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="flex gap-4 items-center">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={clearFilters}
                  className="ml-auto text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat === 'All' ? '' : cat)}
                className={`px-4 py-2 rounded-lg transition ${
                  (cat === 'All' && !category) || category === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-4 text-gray-600">
            <p className="text-lg">
              Found <span className="font-bold text-indigo-600">{events.length}</span> events
              {category && ` in ${category}`}
              {search && ` matching "${search}"`}
            </p>
          </div>
        )}

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg mb-2">😔 No events found</p>
            <p className="text-gray-500 mb-4">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;