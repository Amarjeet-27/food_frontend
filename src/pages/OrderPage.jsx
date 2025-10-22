import React, { useEffect, useState } from "react";
import api from "../api/axios";
import useAuth from "../context/AuthContext";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        // SHOP: get shop orders; CUSTOMER: get user orders
        const url = user.role === "SHOP" ? "/orders/shop" : "/orders";
        const res = await api.get(url);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchOrders();
  }, [user]);

  const changeStatus = async (orderId, status) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status });
      setOrders((o) => o.map((x) => (x.id === orderId ? { ...x, status } : x)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <div className="space-y-3">
        {orders.map((o) => (
          <div
            key={o.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">Order #{o.id}</div>
              <div>Items: {o.items?.map((i) => i.name).join(", ")}</div>
              <div>Status: {o.status}</div>
            </div>
            {user.role === "SHOP" && (
              <div className="flex gap-2">
                <button
                  onClick={() => changeStatus(o.id, "ACCEPTED")}
                  className="px-3 py-1 border rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => changeStatus(o.id, "READY")}
                  className="px-3 py-1 border rounded"
                >
                  Ready
                </button>
                <button
                  onClick={() => changeStatus(o.id, "DELIVERED")}
                  className="px-3 py-1 border rounded"
                >
                  Delivered
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
