import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import Categories from "./Categories";
import CustomerHeroSection from "./CustomerHeroSection";

export default function CustomerDashboard() {
  return (
    <div>
      <CustomerHeroSection />
      <Categories />
      {/* <h1 className="text-2xl font-semibold mb-4">Customer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/customer/items" className="p-4 bg-white rounded shadow">
          Browse Items
        </Link>
        <Link to="/customer/orders" className="p-4 bg-white rounded shadow">
          My Orders
        </Link>
      </div> */}
    </div>
  );
}
