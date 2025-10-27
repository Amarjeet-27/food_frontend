import React, { useEffect, useState } from "react";
import api from "../api/axios";
import useAuth from "../context/UseAuth";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        // SHOP: get shop orders; CUSTOMER: get user orders
        const url = user.role === "SHOP" ? "/orders" : "/orders";
        const res = await api.get(url);
        // console.log(res);
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
        {orders.map((o, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            {o.items?.map((i) => (
              <div>
                <div>Item: {i.item.name}</div>
                <div>Quantity: {i.quantity}</div>
                <div>Price per Order: ${i.item.price}</div>
                <div>Status: {o.status}</div>
              </div>
            ))}

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
