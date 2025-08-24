import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <-- useAuth hook
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const { token, logout } = useAuth(); // <-- use the hook, NOT AuthProvider
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const activeClass = "bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition";
  const inactiveClass = "text-white hover:text-gray-200 transition px-3 py-1";

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          📈 StockTrader
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-200 transition">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={
                  location.pathname === "/login" ? activeClass : inactiveClass
                }
              >
                Login
              </Link>
              <Link
                to="/register"
                className={
                  location.pathname === "/register"
                    ? activeClass
                    : inactiveClass
                }
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600 px-6 py-4 flex flex-col gap-3">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-gray-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="hover:text-gray-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
