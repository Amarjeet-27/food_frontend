import React from "react";
import { Link } from "react-router-dom";

export default function ShopDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Shop Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/shop/items" className="p-4 bg-white rounded shadow">
          Manage Items
        </Link>
        <Link to="/shop/orders" className="p-4 bg-white rounded shadow">
          Orders
        </Link>
      </div>
    </div>
  );
}
