import { formatIndianCurrency } from "../utils/formatCurrency";

export default function BookingConfirmation({ booking, vehicle, onClose }) {
  return (
    <div className="fixed inset-0 bg-ink/60 flex items-center justify-center z-40 p-4">
      <div className="bg-paper rounded-md shadow-xl w-full max-w-md p-6 border-t-4 border-moss text-center">
        <div className="text-moss text-4xl mb-2">✓</div>
        <h2 className="font-display text-2xl uppercase mb-1">Vehicle Booked!</h2>
        <p className="text-sm text-steel mb-4">
          Your booking for the {vehicle.make} {vehicle.model} has been confirmed.
        </p>

        <div className="text-left bg-white border border-ink/10 rounded-sm p-4 text-sm space-y-1 mb-4">
          <p><span className="text-steel">Booking ID:</span> {booking._id}</p>
          <p><span className="text-steel">Name:</span> {booking.buyerName}</p>
          <p><span className="text-steel">Phone:</span> {booking.buyerPhone}</p>
          <p><span className="text-steel">Email:</span> {booking.buyerEmail}</p>
          <p><span className="text-steel">Address:</span> {booking.buyerAddress}</p>
          <p><span className="text-steel">Price:</span> {formatIndianCurrency(booking.price)}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-ink hover:bg-ink-light text-paper font-semibold uppercase tracking-wide text-xs py-2.5 rounded-sm transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}