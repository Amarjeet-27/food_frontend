// OrdersPageCustomer.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import useAuth from "../context/UseAuth";
import { motion } from "framer-motion";
import { format } from "date-fns";

const STATUS_STYLES = {
  PENDING: "bg-yellow-50 text-yellow-800 border-yellow-200",
  ACCEPTED: "bg-blue-50 text-blue-800 border-blue-200",
  READY: "bg-indigo-50 text-indigo-800 border-indigo-200",
  DELIVERED: "bg-green-50 text-green-800 border-green-200",
  CANCELED: "bg-red-50 text-red-800 border-red-200",
};

export default function OrdersPageCustomer() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await api.get("/orders");
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

  const orderTotal = (o) =>
    (o.items || []).reduce(
      (s, it) => s + (it.item?.price || 0) * it.quantity,
      0
    );

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await api.get("/orders");
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleReorder = async (order) => {
    try {
      const items = (order.items || []).map((it) => ({
        itemId: it.item.id || it.item._id,
        quantity: it.quantity,
      }));
      await api.post("/orders", {
        customerEmail: user?.sub,
        items,
        customerAddress: order.customerAddress || order.address || "",
        customerPhone: order.customerPhone || order.phone || "",
      });
      alert("Re-order placed. Check Orders for status.");
    } catch (err) {
      console.error(err);
      alert("Failed to re-order.");
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-gray-50 p-6"
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-40 bg-white rounded-2xl shadow animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 p-6 sm:p-10"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
            <p className="text-sm text-gray-500 mt-1">
              All your past and current orders — track status, re-order, or
              contact support.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              No orders yet
            </h2>
            <p className="text-gray-400 mt-2">
              Order something delicious — your past orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((o) => (
              <motion.article
                key={o.id || o._id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-semibold">
                          #{String(o.id || o._id).slice(-6)}
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {o.merchantName || o.shopName || "Merchant"}
                          </h3>
                          <div className="text-sm text-gray-500">
                            Placed:{" "}
                            {o.createdAt
                              ? format(new Date(o.createdAt), "PPpp")
                              : "—"}
                          </div>
                        </div>

                        <div className="ml-auto">
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${
                              STATUS_STYLES[o.status] || STATUS_STYLES.PENDING
                            }`}
                          >
                            {o.status || "PENDING"}
                          </div>
                        </div>
                      </div>

                      {/* items list */}
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(o.items || []).map((it) => (
                          <div
                            key={it.item?.id || it.item?._id}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border"
                          >
                            <div className="w-12 h-10 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-600">
                              IMG
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-700">
                                {it.item?.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                Qty: {it.quantity}
                              </div>
                            </div>
                            <div className="text-sm font-semibold text-gray-800">
                              ₹
                              {((it.item?.price || 0) * it.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="md:w-56 flex-shrink-0">
                      <div className="p-4 bg-gray-50 rounded-lg border text-center">
                        <div className="text-sm text-gray-500">Total</div>
                        <div className="text-xl font-bold mt-1">
                          ₹{orderTotal(o).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Payment: {o.paymentMethod || "—"}
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <button
                          onClick={() =>
                            window.alert("Track feature not implemented")
                          }
                          className="w-full px-3 py-2 rounded-lg bg-amber-400 text-black font-medium hover:bg-amber-500"
                        >
                          Track Order
                        </button>

                        <button
                          onClick={() => handleReorder(o)}
                          className="w-full px-3 py-2 rounded-lg border bg-white hover:bg-gray-50"
                        >
                          Re-order
                        </button>

                        <button
                          onClick={() =>
                            (window.location.href = `tel:${
                              o.customerPhone || o.phone || ""
                            }`)
                          }
                          className="w-full px-3 py-2 rounded-lg border bg-white hover:bg-gray-50"
                        >
                          Contact Support
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* footer: delivery address & notes */}
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-gray-600">
                    <div>
                      <div className="font-medium">Deliver to</div>
                      <div>{o.customerAddress || o.address || "—"}</div>
                    </div>

                    <div>
                      <div className="font-medium">Phone</div>
                      <div>{o.customerPhone || o.phone || "—"}</div>
                    </div>

                    <div className="truncate">
                      <div className="font-medium">Notes</div>
                      <div>{o.notes || "—"}</div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
