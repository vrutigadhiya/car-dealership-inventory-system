const Booking = require("../models/Booking");

const createBooking = async (data) => {
  return await Booking.create(data);
};

module.exports = { createBooking };