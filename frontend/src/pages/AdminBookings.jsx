import { useState, useEffect } from "react";
import api from "../services/api";
import { formatIndianCurrency } from "../utils/formatCurrency";
import CarLoader from "../components/CarLoader";

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
    <div
      className="
      max-w-6xl
      mx-auto
      px-4
      sm:px-6
      py-6
      sm:py-8
      "
    >
      <h1
        className="
        font-display
        text-2xl
        sm:text-3xl
        uppercase
        mb-6
        "
      >
        All Bookings
      </h1>

      {error && (
        <div
          className="
          bg-rust/10
          border
          border-rust/30
          text-rust
          text-sm
          rounded-xl
          px-3
          py-2
          mb-4
          "
        >
          {error}
        </div>
      )}

      {loading ? (
        <CarLoader message="Loading bookings..." />
      ) : bookings.length === 0 ? (
        <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ink/5 text-3xl text-ink">
            📬
          </div>
          <h2 className="font-display text-xl uppercase mb-2">No bookings yet</h2>
          <p className="text-steel max-w-md mx-auto">
            You don't have any confirmed bookings yet. When a customer books a vehicle, the details will show up here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}

          <div
            className="
          hidden
          md:block
          overflow-x-auto
          bg-white
          border
          border-ink/10
          rounded-xl
          "
          >
            <table className="w-full text-sm">
              <thead
                className="
              bg-ink
              text-paper
              text-xs
              uppercase
              tracking-wide
              "
              >
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
                      {booking.vehicle ? `${booking.vehicle.make} ${booking.vehicle.model}` : "Deleted Vehicle"}
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

                    <td
                      className="
                      px-4
                      py-3
                      text-right
                      font-mono
                      font-semibold
                    "
                    >
                      {formatIndianCurrency(booking.price)}
                    </td>

                    <td
                      className="
                      px-4
                      py-3
                      text-steel
                      text-xs
                      font-mono
                    "
                    >
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}

          <div
            className="
          md:hidden
          space-y-4
        "
          >
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="
              bg-white
              border
              border-ink/10
              rounded-2xl
              p-5
              shadow-sm
              "
              >
                <div
                  className="
                flex
                justify-between
                items-start
                gap-3
              "
                >
                  <h2
                    className="
                  font-display
                  text-lg
                  uppercase
                "
                  >
                    {booking.vehicle ? `${booking.vehicle.make} ${booking.vehicle.model}` : "Deleted Vehicle"}
                  </h2>

                  <span
                    className="
                  text-xs
                  bg-amber
                  text-ink
                  px-2
                  py-1
                  rounded
                  font-semibold
                "
                  >
                    BOOKED
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <p className="text-steel text-xs uppercase">Buyer</p>
                    <p>{booking.buyerName}</p>
                  </div>

                  <div>
                    <p className="text-steel text-xs uppercase">Contact</p>

                    <p>{booking.buyerPhone}</p>

                    <p className="text-xs text-steel break-all">
                      {booking.buyerEmail}
                    </p>
                  </div>

                  <div>
                    <p className="text-steel text-xs uppercase">Address</p>

                    <p className="break-words">{booking.buyerAddress}</p>
                  </div>

                  <div
                    className="
                  flex
                  justify-between
                  border-t
                  border-ink/10
                  pt-3
                "
                  >
                    <span className="text-steel">Price</span>

                    <span
                      className="
                    font-mono
                    font-semibold
                  "
                    >
                      {formatIndianCurrency(booking.price)}
                    </span>
                  </div>

                  <div>
                    <p className="text-steel text-xs">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
