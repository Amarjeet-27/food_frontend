// Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/UseAuth";

export default function Navbar({ cartCount = 0 }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const initials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header style={{ fontFamily: "Times New Roman, serif" }}>
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="text-2xl font-extrabold text-red-600 leading-none">
                  <span className="text-orange-500">Fast</span>Bite
                </div>
              </Link>

              <div className="hidden md:block">
                {/* <div className="relative">
                  <input
                    aria-label="Search items"
                    placeholder="Search dishes, e.g. Biryani"
                    className="w-64 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-amber-300 focus:outline-none text-sm"
                  />
                  <svg
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35"
                    />
                    <circle
                      cx="11"
                      cy="11"
                      r="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div> */}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex md:items-center md:gap-3">
                {!user && (
                  <>
                    <Link
                      to="/login"
                      className="px-3 py-1 text-sm font-medium hover:text-gray-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
                    >
                      Register
                    </Link>
                  </>
                )}

                {user && user.role === "SHOP_OWNER" && (
                  <>
                    <Link
                      to="/shop/items"
                      className="px-3 py-1 text-sm font-medium hover:text-gray-700"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/shop/orders"
                      className="px-3 py-1 text-sm font-medium hover:text-gray-700"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/shop/reports"
                      className="px-3 py-1 text-sm font-medium hover:text-gray-700"
                    >
                      Reports
                    </Link>
                  </>
                )}

                {user && user.role !== "SHOP_OWNER" && (
                  <>
                    <Link
                      to="/customer/items"
                      className="px-3 py-1 text-sm font-medium hover:text-gray-700"
                    >
                      Items
                    </Link>
                    <Link
                      to="/customer/orders"
                      className="px-3 py-1 text-sm font-medium hover:text-gray-700"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/customer/dashboard"
                      className="px-3 py-1 text-sm font-medium hover:text-gray-700"
                    >
                      Dashboard
                    </Link>
                  </>
                )}
              </div>

              {/* cart button (customer) */}
              {user && user.role !== "SHOP_OWNER" && (
                <Link
                  to="/cart"
                  className="relative inline-flex items-center px-3 py-1 rounded-md hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-600 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}

              {/* user area */}
              {user ? (
                <div ref={menuRef} className="relative">
                  <button
                    onClick={() => setMenuOpen((s) => !s)}
                    aria-expanded={menuOpen}
                    aria-haspopup="true"
                    className="flex items-center gap-3 px-2 py-1 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    {/* avatar */}
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
                      {initials(user.name || user.sub || "U")}
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium">
                        {user.name || "User"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {(user.role || "").replace("_", " ").toLowerCase()}
                      </div>
                    </div>
                    <svg
                      className="h-4 w-4 text-gray-400 hidden sm:block"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" />
                    </svg>
                  </button>

                  {/* dropdown */}
                  {menuOpen && (
                    <div
                      role="menu"
                      aria-orientation="vertical"
                      className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-30"
                    >
                      <Link
                        to={
                          user.role === "SHOP_OWNER"
                            ? "/shop/profile"
                            : "/customer/profile"
                        }
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Profile
                      </Link>

                      {user.role !== "SHOP_OWNER" && (
                        <Link
                          to="/customer/orders"
                          className="block px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          My Orders
                        </Link>
                      )}

                      {user.role === "SHOP_OWNER" && (
                        <Link
                          to="/shop/items"
                          className="block px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          Manage Items
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="md:hidden" />
              )}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileOpen((s) => !s)}
                  aria-expanded={mobileOpen}
                  aria-label="Open menu"
                  className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {mobileOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-3 space-y-2">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded bg-blue-600 text-white"
                  >
                    Register
                  </Link>
                </>
              ) : user.role === "SHOP_OWNER" ? (
                <>
                  <Link
                    to="/shop/items"
                    className="block px-3 py-2 rounded hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/shop/orders"
                    className="block px-3 py-2 rounded hover:bg-gray-50"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/shop/reports"
                    className="block px-3 py-2 rounded hover:bg-gray-50"
                  >
                    Reports
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/customer/items"
                    className="block px-3 py-2 rounded hover:bg-gray-50"
                  >
                    Items
                  </Link>
                  <Link
                    to="/customer/orders"
                    className="block px-3 py-2 rounded hover:bg-gray-50"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/customer/dashboard"
                    className="block px-3 py-2 rounded hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-50"
                  >
                    <span>Cart</span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold bg-red-600 text-white rounded-full">
                      {cartCount}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
