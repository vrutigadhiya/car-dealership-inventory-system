import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const navClass = ({ isActive }) =>
    `
    uppercase
    tracking-wide
    text-xs
    font-semibold
    transition-colors
    px-3
    py-1.5
    rounded-sm
    ${isActive ? "bg-amber text-ink" : "hover:text-amber hover:bg-paper/10"}
    `;

  const getInitials = () => {
    if (!user?.name) return "";

    return user.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <header className="bg-ink text-paper sticky top-0 z-20 shadow-lg">
      <div className="h-1.5 stripe-accent" />

      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        py-4
      "
      >
        <div
          className="
          flex
          items-center
          justify-between
        "
        >
          {/* Logo */}

          <Link
            to={user ? (isAdmin ? "/admin" : "/dashboard") : "/login"}
            onClick={() => setMenuOpen(false)}
            className="flex items-baseline gap-2"
          >
            <span
              className="
              font-display
              text-xl
              sm:text-2xl
              tracking-wide
              uppercase
            "
            >
              Ironclad
            </span>

            <span
              className="
              hidden
              sm:block
              font-mono
              text-xs
              text-amber
              tracking-widest
            "
            >
              MOTORS · INVENTORY
            </span>
          </Link>

          {/* Desktop Menu */}

          <nav
            className="
            hidden
            md:flex
            items-center
            gap-5
          "
          >
            {!user ? (
              <>
                <NavLink to="/login" className={navClass}>
                  Log In
                </NavLink>

                <NavLink to="/register" className={navClass}>
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className={navClass}
                >
                  Dashboard
                </NavLink>

                {!isAdmin && (
                  <NavLink to="/my-bookings" className={navClass}>
                    My Bookings
                  </NavLink>
                )}

                {isAdmin && (
                  <NavLink to="/admin/bookings" className={navClass}>
                    Bookings
                  </NavLink>
                )}

                <div
                  className="
                  flex
                  items-center
                  gap-2
                  text-paper/80
                  font-medium
                "
                >
                  {user.name}

                  {isAdmin && (
                    <span
                      className="
                      bg-amber
                      text-ink
                      px-2
                      py-0.5
                      text-[10px]
                      rounded-sm
                    "
                    >
                      ADMIN
                    </span>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="
                    border
                    border-paper/30
                    hover:border-amber
                    hover:text-amber
                    px-3
                    py-1.5
                    rounded-sm
                    uppercase
                    text-xs
                    font-semibold
                  "
                >
                  Log Out
                </button>
              </>
            )}
          </nav>

          {/* Mobile Profile Button */}

          {user && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                md:hidden
                w-10
                h-10
                rounded-full
                bg-amber
                text-ink
                font-bold
                flex
                items-center
                justify-center
              "
            >
              {getInitials()}
            </button>
          )}

          {!user && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                md:hidden
                text-amber
                text-2xl
              "
            >
              ☰
            </button>
          )}
        </div>

        {/* Mobile Menu */}

        {menuOpen && (
          <nav
            className="
            md:hidden
            mt-5
            pt-5
            border-t
            border-paper/20
            flex
            flex-col
            gap-4
          "
          >
            {!user ? (
              <>
                <NavLink
                  onClick={() => setMenuOpen(false)}
                  to="/login"
                  className={navClass}
                >
                  Log In
                </NavLink>

                <NavLink
                  onClick={() => setMenuOpen(false)}
                  to="/register"
                  className={navClass}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  onClick={() => setMenuOpen(false)}
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className={navClass}
                >
                  Dashboard
                </NavLink>

                {!isAdmin && (
                  <NavLink
                    onClick={() => setMenuOpen(false)}
                    to="/my-bookings"
                    className={navClass}
                  >
                    My Bookings
                  </NavLink>
                )}

                {isAdmin && (
                  <NavLink
                    onClick={() => setMenuOpen(false)}
                    to="/admin/bookings"
                    className={navClass}
                  >
                    Bookings
                  </NavLink>
                )}

                <div
                  className="
                  text-paper/80
                  px-3
                  text-sm
                "
                >
                  {user.name}

                  {isAdmin && (
                    <span
                      className="
                      ml-2
                      bg-amber
                      text-ink
                      px-2
                      py-1
                      text-[10px]
                    "
                    >
                      ADMIN
                    </span>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="
                    border
                    border-paper/30
                    px-3
                    py-2
                    rounded-sm
                    text-xs
                    w-fit
                  "
                >
                  Log Out
                </button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
