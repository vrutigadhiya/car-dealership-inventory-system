const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    buyerName: { type: String, required: true },
    buyerPhone: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    buyerAddress: { type: String, required: true },
    price: { type: Number, required: true }, // snapshot at time of booking
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);