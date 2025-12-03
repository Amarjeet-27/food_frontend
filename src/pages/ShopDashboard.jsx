import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";

export default function ShopDashboard() {
  // sample stats (replace with real data or props)
  const stats = [
    { id: 1, label: "Total Items", value: 128, icon: "box" },
    { id: 2, label: "Orders Today", value: 23, icon: "shopping" },
    { id: 3, label: "Revenue (₹)", value: "12,450", icon: "rupee" },
  ];

  const quickLinks = [
    { to: "/shop/items/new", label: "Add new item", icon: "plus" },
    { to: "/shop/orders", label: "View orders", icon: "orders" },
    { to: "/shop/reports", label: "Sales reports", icon: "chart" },
  ];

  const recent = [
    {
      id: 1,
      name: "Pizza Margherita",
      price: 220,
      img: "https://foodish-api.com/images/pizza/pizza1.jpg",
    },
    {
      id: 2,
      name: "Veg Biryani",
      price: 180,
      img: "https://foodish-api.com/images/biryani/biryani65.jpg",
    },
    {
      id: 3,
      name: "Chocolate Lava Cake",
      price: 80,
      img: "https://foodish-api.com/images/dessert/dessert1.jpg",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <div className="max-w-7xl mx-auto">
        <HeroSection />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Stats + Quick actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-3">Overview</h3>
              <div className="grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.id}
                    className="bg-gradient-to-b from-white to-gray-50 rounded-lg p-3 text-center border"
                  >
                    <div className="flex items-center justify-center mb-2">
                      {s.icon === "box" && (
                        <svg
                          className="h-6 w-6 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7"
                          />
                        </svg>
                      )}
                      {s.icon === "shopping" && (
                        <svg
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                          />
                        </svg>
                      )}
                      {s.icon === "rupee" && (
                        <svg
                          className="h-6 w-6 text-yellow-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 3v6m0 0c4 0 6 2 6 5s-2 5-6 5"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{s.label}</div>
                    <div className="text-xl font-bold mt-1">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-3">Quick actions</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                {quickLinks.map((q) => (
                  <Link
                    key={q.to}
                    to={q.to}
                    className="flex-1 inline-flex items-center gap-3 px-4 py-2 rounded-lg border hover:shadow-sm"
                  >
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                      {q.icon === "plus" ? "+" : "›"}
                    </span>
                    <span>{q.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-3">Announcements</h3>
              <p className="text-sm text-gray-600">No new announcements.</p>
            </div>
          </div>

          {/* Right: Main panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent items</h3>
                <Link to="/shop/items" className="text-sm text-indigo-600">
                  View all
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recent.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg"
                  >
                    <img
                      src={r.img}
                      alt={r.name}
                      className="w-24 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{r.name}</h4>
                          <p className="text-xs text-gray-500">
                            A delicious choice
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">
                            ₹{r.price}
                          </div>
                          <div className="text-xs text-gray-400">in stock</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-3">Orders snapshot</h3>
              <div className="text-sm text-gray-600">
                You have <span className="font-medium">5</span> active orders.
                Click{" "}
                <Link to="/shop/orders" className="text-indigo-600">
                  here
                </Link>{" "}
                to manage them.
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-gray-50 border">
                  Today's Orders: <div className="font-semibold">23</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border">
                  Pending: <div className="font-semibold">4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
