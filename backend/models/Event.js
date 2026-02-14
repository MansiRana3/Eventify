const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add an event name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Music', 'Sports', 'Comedy', 'Tech', 'Arts'],
    },
    date: {
      type: Date,
      required: [true, 'Please add an event date'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0,
    },
    availableSeats: {
      type: Number,
      required: [true, 'Please add available seats'],
      min: 0,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/400x300',
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviews: [reviewSchema],
    averageRating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);