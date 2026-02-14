const express = require('express');
const {
  createBooking,
  getMyBookings,
  getBooking,
  cancelBooking,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, createBooking);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/:id').get(protect, getBooking);
router.route('/:id/cancel').put(protect, cancelBooking);

module.exports = router;