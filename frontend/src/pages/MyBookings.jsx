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
        setError(
          err.response?.data?.message || "Failed to load your bookings.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8 rounded-3xl bg-ink/5 border border-ink/10 p-8 shadow-sm">
        <h1 className="font-display text-4xl uppercase tracking-tight text-ink mb-3">
          My Bookings
        </h1>
        <p className="text-steel max-w-2xl text-sm leading-7">
          Review your confirmed reservations, check booking dates, and view
          pricing in a clean, polished layout.
        </p>
      </div>

      {error && (
        <div className="bg-rust/10 border border-rust/30 text-rust text-sm rounded-3xl px-4 py-3 mb-6 shadow-sm">
          {error}
        </div>
      )}

      {loading ? (
        <CarLoader message="Loading inventory..." />
      ) : bookings.length === 0 ? (
        <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-sm">
          <p className="text-steel text-lg">
            You haven't booked any vehicles yet.
          </p>
          <p className="mt-2 text-sm text-ink/70">
            Browse our inventory and find your next ride.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-ink/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-ink">
                      {booking.vehicle?.category || "Vehicle"}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-800">
                      {booking.status || "Confirmed"}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl uppercase tracking-tight text-ink">
                    {booking.vehicle?.make} {booking.vehicle?.model}
                  </h2>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-ink/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-steel">
                        Booked on
                      </p>
                      <p className="mt-2 font-mono text-sm text-ink">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-ink/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-steel">
                        Booking ID
                      </p>
                      <p className="mt-2 font-mono text-sm text-ink break-all">
                        {booking._id}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-ink/5 px-6 py-5 text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-steel">
                    Total Price
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-ink">
                    {formatIndianCurrency(booking.price)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
