import React from "react";

import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import {
  LoginPage,
  RegisterPage,
  ShopDashboard,
  CustomerDashboard,
  ItemsPage,
  OrdersPage,
  ItemForm,
  NotFound,
} from "./pages/AllPages.jsx";
import useAuth from "./context/UseAuth.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to={user.role === "SHOP" ? "/shop" : "/customer"} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute allowedRoles={["SHOP"]} />}>
              <Route path="/shop" element={<ShopDashboard />} />
              <Route path="/shop/items/new" element={<ItemForm />} />
              <Route path="/shop/items" element={<ItemsPage />} />
              <Route path="/shop/orders" element={<OrdersPage />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["CUSTOMER"]} />}>
              <Route path="/customer" element={<CustomerDashboard />} />
              <Route path="/customer/items" element={<ItemsPage />} />
              <Route path="/customer/orders" element={<OrdersPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
