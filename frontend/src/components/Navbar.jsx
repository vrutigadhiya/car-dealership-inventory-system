import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-ink text-paper sticky top-0 z-20 shadow-lg">
      <div className="h-1.5 stripe-accent" />

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={user ? (isAdmin ? "/admin" : "/dashboard") : "/login"}
          className="flex items-baseline gap-2"
        >
          <span className="font-display text-2xl tracking-wide uppercase">
            Ironclad
          </span>
          <span className="font-mono text-xs text-amber tracking-widest">
            MOTORS · INVENTORY
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm">
          {user ? (
            <>
              <Link
                to={isAdmin ? "/admin" : "/dashboard"}
                className="hover:text-amber transition-colors"
              >
                Dashboard
              </Link>
              {!isAdmin && (
                <Link
                  to="/my-bookings"
                  className="hover:text-amber transition-colors uppercase tracking-wide text-xs font-semibold"
                >
                  My Bookings
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin/bookings"
                  className="hover:text-amber transition-colors uppercase tracking-wide text-xs font-semibold"
                >
                  Bookings
                </Link>
              )}

              <span className="hidden sm:inline text-paper/70">
                {user.name}

                {isAdmin && (
                  <span className="ml-2 font-mono text-[10px] uppercase bg-amber text-ink px-2 py-0.5 rounded-sm tracking-wider">
                    Admin
                  </span>
                )}
              </span>

              <button
                onClick={handleLogout}
                className="border border-paper/30 hover:border-amber hover:text-amber transition-colors px-3 py-1.5 rounded-sm uppercase tracking-wide text-xs font-semibold"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `uppercase tracking-wide text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-amber-dark text-ink transition-colors px-3 py-1.5 rounded-sm"
                      : "hover:text-amber"
                  }`
                }
              >
                Log In
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `uppercase tracking-wide text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-amber-dark text-ink transition-colors px-3 py-1.5 rounded-sm"
                      : "hover:text-amber"
                  }`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
