import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // for icons (install: npm i lucide-react)

export default function Navbar() {
  const { token, logout } = useAuth();
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home", auth: false },
    { path: "/dashboard", label: "Dashboard", auth: true },
    { path: "/portfolio", label: "Portfolio", auth: true },
    { path: "/market", label: "Market", auth: true },
  ];

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Trading Sim
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks
            .filter((link) => !link.auth || token)
            .map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  loc.pathname === link.path
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600"
                } hover:text-blue-500 transition`}
              >
                {link.label}
              </Link>
            ))}

          {token && (
            <button
              onClick={logout}
              className="text-sm bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow px-4 py-3 space-y-3">
          {navLinks
            .filter((link) => !link.auth || token)
            .map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`block ${
                  loc.pathname === link.path
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600"
                } hover:text-blue-500 transition`}
              >
                {link.label}
              </Link>
            ))}

          {token && (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="block w-full text-left text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
