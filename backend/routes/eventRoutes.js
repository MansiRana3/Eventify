const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  addReview,
  getHostEvents,
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router
  .route('/')
  .get(getEvents)
  .post(protect, authorize('host'), upload.single('image'), createEvent);

router.route('/host/myevents').get(protect, authorize('host'), getHostEvents);

router
  .route('/:id')
  .get(getEvent)
  .put(protect, authorize('host'), upload.single('image'), updateEvent)
  .delete(protect, authorize('host'), deleteEvent);

router.route('/:id/reviews').post(protect, addReview);

module.exports = router;