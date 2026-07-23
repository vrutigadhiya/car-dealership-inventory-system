import { useState, useEffect } from "react";
import api from "../services/api";
import { formatIndianCurrency } from "../utils/formatCurrency";
import CarLoader from "../components/CarLoader";
import { Calendar, Hash, Copy, Check, Car, Tag } from "lucide-react";
import { useToast } from "../context/ToastContext";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ||
  'http://localhost:5000';

const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${API_BASE}${cleanPath}`;
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState("");
  const { showToast } = useToast();

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

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    showToast("Booking ID copied to clipboard!");
    setTimeout(() => setCopiedId(""), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8 rounded-2xl bg-ink/5 border border-ink/10 p-6 sm:p-8 shadow-xs">
        <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-ink mb-3">
          My Bookings
        </h1>
        <p className="text-steel text-sm leading-6 max-w-2xl">
          Review your confirmed reservations, check booking dates, and view
          pricing in a clean, polished layout.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-rust/10 border border-rust/30 text-rust text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {/* Loading & Lists */}
      {loading ? (
        <CarLoader message="Loading bookings..." />
      ) : bookings.length === 0 ? (
        <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center shadow-xs">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ink/5 text-3xl text-ink">
            📬
          </div>
          <p className="text-ink font-semibold text-base sm:text-lg">
            You haven't booked any vehicles yet.
          </p>
          <p className="mt-2 text-sm text-steel">
            Browse our inventory and find your next ride.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const rawImagePath = booking.vehicle?.imageUrl || booking.vehicle?.image;
            const imageUrl = getImageUrl(rawImagePath);

            return (
              <div
                key={booking._id}
                className="group bg-white rounded-2xl border border-ink/10 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Image Section */}
                <div className="w-full md:w-72 h-48 md:h-auto min-h-[12rem] bg-paper-dim relative overflow-hidden flex-shrink-0">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={booking.vehicle ? `${booking.vehicle.make} ${booking.vehicle.model}` : "Vehicle"}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-steel/30 bg-ink/5">
                      <Car size={40} className="stroke-[1.5]" />
                      <span className="text-xs uppercase font-mono tracking-wider mt-2">No Image</span>
                    </div>
                  )}

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-ink/90 text-amber text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm backdrop-blur-xs">
                      {booking.vehicle?.category || "Vehicle"}
                    </span>
                    <span className="bg-emerald-600 text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
                      {booking.status || "Confirmed"}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h2 className="font-display text-2xl uppercase tracking-tight text-ink leading-tight">
                          {booking.vehicle ? `${booking.vehicle.make} ${booking.vehicle.model}` : "Deleted Vehicle"}
                        </h2>
                        <p className="text-xs text-steel font-mono uppercase tracking-wider mt-1">
                          Reservation Details
                        </p>
                      </div>
                      
                      <div className="hidden sm:flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active Booking
                      </div>
                    </div>

                    {/* Meta Fields Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-paper-dim/40 rounded-xl p-3 border border-ink/5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-ink/5 flex items-center justify-center text-steel">
                          <Calendar size={16} />
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-mono tracking-wider text-steel">Booked On</p>
                          <p className="font-mono text-sm font-semibold text-ink mt-0.5">
                            {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric"
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="bg-paper-dim/40 rounded-xl p-3 border border-ink/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-ink/5 flex items-center justify-center text-steel">
                            <Hash size={16} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[9px] uppercase font-mono tracking-wider text-steel">Booking ID</p>
                            <p className="font-mono text-xs font-semibold text-ink mt-0.5 truncate pr-2">
                              {booking._id}
                            </p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => copyToClipboard(booking._id)}
                          className="w-7 h-7 rounded-md hover:bg-ink/5 flex items-center justify-center text-steel hover:text-ink transition-colors cursor-pointer flex-shrink-0"
                          title="Copy Booking ID"
                        >
                          {copiedId === booking._id ? (
                            <Check size={14} className="text-emerald-600" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer / Price Row */}
                  <div className="border-t border-ink/5 pt-4 mt-6 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber/15 flex items-center justify-center text-amber-dark">
                        <Tag size={12} />
                      </div>
                      <span className="text-xs uppercase font-mono tracking-wider text-steel">
                        Guaranteed Price
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-steel font-medium">Total</span>
                      <span className="text-2xl font-bold text-ink tracking-tight font-mono">
                        {formatIndianCurrency(booking.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
