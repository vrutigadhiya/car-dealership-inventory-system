const Booking = require("../models/Booking");

const createBooking = async (data) => {
  return await Booking.create(data);
};

const getBookingsByUser = async (userId) => {
  return await Booking.find({ user: userId })
    .populate("vehicle", "make model category imageUrl")
    .sort({ createdAt: -1 });
};

const getAllBookings = async () => {
  return await Booking.find({})
    .populate("vehicle", "make model category imageUrl")
    .populate("user", "name email")
    .sort({ createdAt: -1 });
};

module.exports = { createBooking, getBookingsByUser, getAllBookings };