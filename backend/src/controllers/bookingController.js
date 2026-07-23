const { getBookingsByUser, getBookingsByAdmin } = require("../services/bookingService");

// GET /api/bookings/my — customer's own bookings
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await getBookingsByUser(req.user.id);

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings — admin, all bookings across all customers
const getAllBookingsHandler = async (req, res, next) => {
  try {
    const bookings = await getBookingsByAdmin(req.user.id);

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyBookings, getAllBookingsHandler };