import React, { useEffect, useState } from "react";
import useAuth from "../context/UseAuth";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

// Polished CustomerInfo component
// - Responsive two-column layout (profile + actions on left, recent orders on right)
// - Avatar, editable profile button, logout
// - Summary stats and quick links
// - Recent orders preview (fetches /orders/customer)

export default function CustomerInfo() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await api.get("/orders/customer");
        if (!mounted) return;
        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (user) fetchOrders();
    return () => (mounted = false);
  }, [user]);

  const recent = orders.slice(0, 3);
  const ordersCount = orders.length;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 p-6"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Profile card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-md border">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {/* simple avatar from initials */}
                <div className="text-2xl font-bold text-gray-700">
                  {(user.name || "U")
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              </div>

              <div>
                <div className="text-lg font-semibold">
                  {user.name || "Unknown User"}
                </div>
                <div className="text-sm text-gray-500">{user.sub}</div>
                <div className="mt-2 inline-flex items-center gap-2 text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                  {user.role}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-sm text-gray-500">Orders</div>
                <div className="font-semibold text-lg">{ordersCount}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Favorites</div>
                <div className="font-semibold text-lg">—</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Member</div>
                <div className="font-semibold text-lg">Since 2024</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                to="/customer/orders"
                className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white text-center"
              >
                My Orders
              </Link>
              <button
                onClick={() => navigate("/customer/profile/edit")}
                className="px-4 py-2 rounded-lg border"
              >
                Edit
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 w-full px-4 py-2 rounded-lg border bg-white text-red-600"
            >
              Logout
            </button>
          </div>

          <div className="mt-4 bg-white rounded-2xl p-4 shadow border text-sm">
            <div className="font-semibold mb-2">Support</div>
            <p className="text-gray-600">
              Need help with an order? Reach out to our support anytime.
            </p>
            <div className="mt-3 flex gap-2">
              <a
                href="tel:1800123456"
                className="px-3 py-2 rounded-lg border text-sm"
              >
                Call
              </a>
              <a
                href="mailto:support@shop.com"
                className="px-3 py-2 rounded-lg border text-sm"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Right: main content (orders preview + quick actions) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-md border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Recent Orders</h3>
                <p className="text-sm text-gray-500">
                  A quick glance at your latest orders
                </p>
              </div>
              <Link to="/customer/orders" className="text-sm text-blue-600">
                View all
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {loading ? (
                <div className="space-y-3">
                  <div className="h-12 bg-gray-100 rounded animate-pulse" />
                  <div className="h-12 bg-gray-100 rounded animate-pulse" />
                  <div className="h-12 bg-gray-100 rounded animate-pulse" />
                </div>
              ) : recent.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No recent orders yet.
                </div>
              ) : (
                recent.map((o) => (
                  <div
                    key={o.id}
                    className="p-3 rounded-lg border bg-gray-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">
                        Order #{String(o.id).slice(-6)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {o.items?.length || 0} items • ₹
                        {(o.items || [])
                          .reduce(
                            (s, it) => s + (it.item?.price || 0) * it.quantity,
                            0
                          )
                          .toFixed(2)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">{o.status}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border">
            <h3 className="text-xl font-semibold">Quick Actions</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                to="/customer/items"
                className="p-3 bg-amber-400 rounded-lg text-center font-medium"
              >
                Browse Items
              </Link>
              <Link
                to="/customer/orders"
                className="p-3 border rounded-lg text-center"
              >
                My Orders
              </Link>
              <Link
                to="/customer/profile"
                className="p-3 border rounded-lg text-center"
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
