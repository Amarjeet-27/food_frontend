import React, { useEffect, useState } from "react";
import api from "../api/axios";
import useAuth from "../context/UseAuth";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  ACCEPTED: "bg-blue-100 text-blue-800 border-blue-300",
  READY: "bg-indigo-100 text-indigo-800 border-indigo-300",
  DELIVERED: "bg-green-100 text-green-800 border-green-300",
  CANCELED: "bg-red-100 text-red-800 border-red-300",
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const url = user.role === "SHOP_OWNER" ? "/orders" : "/orders";
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
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">
        📦 Your Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <p className="text-xl text-gray-600">No orders found.</p>
          <p className="text-gray-400 mt-2">
            Start placing or accepting orders to see them here!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((o, index) => (
            <div
              key={index} // Using o.id for better key stability if available
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4 border-b pb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Order #<span className="text-indigo-600">{index + 1}</span>
                  </h3>
                </div>

                {/* Current Status */}
                <div
                  className={`px-4 py-1 text-sm font-semibold rounded-full border ${
                    statusColors[o.status] || statusColors.PENDING
                  }`}
                >
                  {o.status || "PENDING"}
                </div>
              </div>

              {/* Order Items List */}
              <div className="space-y-3 mb-6">
                <p className="text-md font-medium text-gray-700">
                  Items Ordered:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {o.items?.map((i, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="font-semibold text-gray-800">
                        {i.item.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        Quantity:{" "}
                        <span className="font-medium">{i.quantity}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Price per Order:{" "}
                        <span className="font-medium text-green-700">
                          ${i.item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shop Owner Actions */}
              {user.role === "SHOP_OWNER" && (
                <div className="mt-6 pt-4 border-t">
                  <p className="font-semibold text-gray-700 mb-3">
                    Update Order Status:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => changeStatus(o.id, "ACCEPTED")}
                      className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                      disabled={
                        o.status === "ACCEPTED" ||
                        o.status === "READY" ||
                        o.status === "DELIVERED"
                      }
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => changeStatus(o.id, "READY")}
                      className="px-4 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition disabled:opacity-50"
                      disabled={
                        o.status === "READY" ||
                        o.status === "DELIVERED" ||
                        o.status === "PENDING"
                      }
                    >
                      Ready
                    </button>
                    <button
                      onClick={() => changeStatus(o.id, "DELIVERED")}
                      className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                      disabled={o.status === "DELIVERED"}
                    >
                      Delivered
                    </button>
                    <button
                      onClick={() => changeStatus(o.id, "CANCELED")}
                      className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition disabled:opacity-50 ml-auto"
                      disabled={o.status === "DELIVERED"}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
