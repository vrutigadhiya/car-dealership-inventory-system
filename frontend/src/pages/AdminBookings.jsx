import { useState, useEffect } from "react";
import api from "../services/api";
import { formatIndianCurrency } from "../utils/formatCurrency";
import CarLoader from "./components/CarLoader";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings");
        setBookings(res.data.bookings);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="font-display text-3xl uppercase mb-6">All Bookings</h1>

      {error && (
        <div className="bg-rust/10 border border-rust/30 text-rust text-sm rounded-sm px-3 py-2 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <CarLoader message="Loading inventory..." />
      ) : bookings.length === 0 ? (
        <p className="text-steel">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-ink/10 rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-ink text-paper text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">Vehicle</th>
                <th className="px-4 py-3 text-left">Buyer</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t border-ink/10">
                  <td className="px-4 py-3">
                    {booking.vehicle?.make} {booking.vehicle?.model}
                  </td>
                  <td className="px-4 py-3">{booking.buyerName}</td>
                  <td className="px-4 py-3 text-steel">
                    {booking.buyerPhone}
                    <br />
                    <span className="text-xs">{booking.buyerEmail}</span>
                  </td>
                  <td className="px-4 py-3 text-steel">
                    {booking.buyerAddress}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold">
                    {formatIndianCurrency(booking.price)}
                  </td>
                  <td className="px-4 py-3 text-steel text-xs font-mono">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
