const Event = require('../models/Event');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Search by name or location
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const events = await Event.find(query)
      .populate('host', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('host', 'name email phone')
      .populate('reviews.user', 'name avatar');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create event
// @route   POST /api/events
// @access  Private (Host only)
exports.createEvent = async (req, res) => {
  try {
    // Add host to req.body
    req.body.host = req.user.id;

    // Handle image upload
    if (req.file) {
      req.body.image = req.file.path;
    }

    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Host only)
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Make sure user is event host
    if (event.host.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this event',
      });
    }

    // Handle image upload
    if (req.file) {
      // Delete old image from cloudinary if exists
      if (event.image && event.image.includes('cloudinary')) {
        const publicId = event.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`eventify/${publicId}`);
      }
      req.body.image = req.file.path;
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Host only)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Make sure user is event host
    if (event.host.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this event',
      });
    }

    // Delete image from cloudinary if exists
    if (event.image && event.image.includes('cloudinary')) {
      const publicId = event.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`eventify/${publicId}`);
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add review to event
// @route   POST /api/events/:id/reviews
// @access  Private
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check if user already reviewed
    const alreadyReviewed = event.reviews.find(
      (review) => review.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this event',
      });
    }

    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    event.reviews.push(review);
    event.numReviews = event.reviews.length;
    event.averageRating =
      event.reviews.reduce((acc, item) => item.rating + acc, 0) /
      event.reviews.length;

    await event.save();

    res.status(201).json({
      success: true,
      message: 'Review added',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get host's events
// @route   GET /api/events/host/myevents
// @access  Private (Host only)
exports.getHostEvents = async (req, res) => {
  try {
    const events = await Event.find({ host: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};