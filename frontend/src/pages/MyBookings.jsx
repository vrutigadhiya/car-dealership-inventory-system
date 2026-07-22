import { useState, useEffect } from "react";
import api from "../services/api";
import { formatIndianCurrency } from "../utils/formatCurrency";
import CarLoader from "../components/CarLoader";

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
    <div
      className="
      max-w-5xl 
      mx-auto 
      px-4 
      sm:px-6 
      py-6 
      sm:py-10
    "
    >
      {/* Header */}

      <div
        className="
        mb-6
        sm:mb-8
        rounded-2xl
        sm:rounded-3xl
        bg-ink/5
        border
        border-ink/10
        p-5
        sm:p-8
        shadow-sm
      "
      >
        <h1
          className="
          font-display
          text-3xl
          sm:text-4xl
          uppercase
          tracking-tight
          text-ink
          mb-3
        "
        >
          My Bookings
        </h1>

        <p
          className="
          text-steel
          text-sm
          leading-6
        "
        >
          Review your confirmed reservations, check booking dates, and view
          pricing in a clean, polished layout.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div
          className="
          bg-rust/10
          border
          border-rust/30
          text-rust
          text-sm
          rounded-2xl
          px-4
          py-3
          mb-6
        "
        >
          {error}
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <CarLoader message="Loading bookings..." />
      ) : bookings.length === 0 ? (
        <div
          className="
          rounded-2xl
          sm:rounded-3xl
          border
          border-ink/10
          bg-white
          p-5
          sm:p-8
          shadow-sm
        "
        >
          <p className="text-steel text-base sm:text-lg">
            You haven't booked any vehicles yet.
          </p>

          <p className="mt-2 text-sm text-ink/70">
            Browse our inventory and find your next ride.
          </p>
        </div>
      ) : (
        <div className="space-y-5 sm:space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="
                rounded-2xl
                sm:rounded-3xl
                border
                border-ink/10
                bg-white
                p-4
                sm:p-6
                shadow-sm
              "
            >
              <div
                className="
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
              >
                {/* Vehicle Details */}

                <div className="space-y-4 w-full">
                  <div
                    className="
                    flex
                    flex-wrap
                    gap-2
                  "
                  >
                    <span
                      className="
                      rounded-full
                      bg-ink/5
                      px-3
                      py-1
                      text-[10px]
                      sm:text-xs
                      uppercase
                      tracking-[0.18em]
                    "
                    >
                      {booking.vehicle?.category || "Vehicle"}
                    </span>

                    <span
                      className="
                      rounded-full
                      bg-emerald-100
                      px-3
                      py-1
                      text-[10px]
                      sm:text-xs
                      uppercase
                      tracking-[0.18em]
                      text-emerald-800
                    "
                    >
                      {booking.status || "Confirmed"}
                    </span>
                  </div>

                  <h2
                    className="
                    font-display
                    text-xl
                    sm:text-2xl
                    uppercase
                    tracking-tight
                    text-ink
                  "
                  >
                    {booking.vehicle?.make} {booking.vehicle?.model}
                  </h2>

                  <div
                    className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    gap-3
                  "
                  >
                    <div
                      className="
                      rounded-2xl
                      bg-ink/5
                      p-4
                    "
                    >
                      <p
                        className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-steel
                      "
                      >
                        Booked on
                      </p>

                      <p
                        className="
                        mt-2
                        font-mono
                        text-sm
                        text-ink
                      "
                      >
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div
                      className="
                      rounded-2xl
                      bg-ink/5
                      p-4
                    "
                    >
                      <p
                        className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-steel
                      "
                      >
                        Booking ID
                      </p>

                      <p
                        className="
                        mt-2
                        font-mono
                        text-xs
                        sm:text-sm
                        break-all
                        text-ink
                      "
                      >
                        {booking._id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price */}

                <div
                  className="
                  w-full
                  lg:w-auto
                  rounded-2xl
                  bg-ink/5
                  px-5
                  py-4
                  text-left
                  lg:text-right
                "
                >
                  <p
                    className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-steel
                  "
                  >
                    Total Price
                  </p>

                  <p
                    className="
                    mt-2
                    text-2xl
                    sm:text-3xl
                    font-semibold
                    text-ink
                  "
                  >
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
