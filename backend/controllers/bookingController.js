const Booking = require('../models/Booking');
const Event = require('../models/Event');
const sendEmail = require('../utils/sendEmail');

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const { eventId, quantity } = req.body;

    const event = await Event.findById(eventId).populate('host', 'name email');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check if enough seats available
    if (event.availableSeats < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough seats available',
      });
    }

    const totalPrice = event.price * quantity;

    const booking = await Booking.create({
      user: req.user.id,
      event: eventId,
      quantity,
      totalPrice,
    });

    // Update available seats
    event.availableSeats -= quantity;
    await event.save();

    // Send confirmation email
    const message = `
      <h1>Booking Confirmation</h1>
      <p>Hi ${req.user.name},</p>
      <p>Your booking has been confirmed!</p>
      <h3>Booking Details:</h3>
      <p><strong>Event:</strong> ${event.name}</p>
      <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Quantity:</strong> ${quantity} ticket(s)</p>
      <p><strong>Total Price:</strong> ₹${totalPrice}</p>
      <p>Thank you for using Eventify!</p>
    `;

    try {
      await sendEmail({
        email: req.user.email,
        subject: 'Booking Confirmation - Eventify',
        message,
      });
    } catch (error) {
      console.log('Email could not be sent');
    }

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/mybookings
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('event', 'name date location image category')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('event', 'name date location image category price')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Make sure user owns the booking
    if (booking.user._id.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view this booking',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Make sure user owns the booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to cancel this booking',
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled',
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Restore available seats
    const event = await Event.findById(booking.event);
    event.availableSeats += booking.quantity;
    await event.save();

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};