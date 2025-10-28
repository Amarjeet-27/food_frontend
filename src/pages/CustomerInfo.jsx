import { useEffect, useState } from "react";
import useAuth from "../context/UseAuth";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const CustomerInfo = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     if (!user) return;

  //     async function fetchOrders() {
  //       try {
  //         const res = await api.get(`/orders/user/${user.email}`);
  //         setOrders(res.data);
  //       } catch (err) {
  //         console.error("Error fetching user orders:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }

  //     fetchOrders();
  //   }, [user]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">👤 Customer Information</h2>
      </div>

      {/* 🧾 User Info */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Profile Details</h3>
        <p>
          <strong>Name:</strong> {user.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user.sub}
        </p>
        <p>
          <strong>Role:</strong>{" "}
          <span className="uppercase text-blue-600 font-medium">
            {user.role}
          </span>
        </p>
      </div>

      {/* 🛒 Orders */}
      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <Link
            to="/customer/orders"
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Your Orders
          </Link>
          <Link
            to="/customer/items"
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Browse Items
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
