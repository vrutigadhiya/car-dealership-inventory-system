import { useState, useEffect } from "react";
import api from "../services/api";
import { formatIndianCurrency } from "../utils/formatCurrency";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my");
        setBookings(res.data.bookings);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load your bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="font-display text-3xl uppercase mb-6">My Bookings</h1>

      {error && (
        <div className="bg-rust/10 border border-rust/30 text-rust text-sm rounded-sm px-3 py-2 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-steel">Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-steel">You haven't booked any vehicles yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border border-ink/10 rounded-md p-4 flex items-center justify-between"
            >
              <div>
                <h2 className="font-display text-lg uppercase">
                  {booking.vehicle?.make} {booking.vehicle?.model}
                </h2>
                <p className="text-xs text-steel uppercase tracking-wide">
                  {booking.vehicle?.category}
                </p>
                <p className="text-xs text-steel mt-1 font-mono">
                  Booked on {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="font-mono text-xl font-semibold text-ink-light">
                {formatIndianCurrency(booking.price)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}