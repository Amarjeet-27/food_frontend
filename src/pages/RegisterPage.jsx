import React, { useState } from "react";
import useAuth from "../context/UseAuth";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (!res.ok) return setError(res.error);
    navigate("/login");
  };

  return (
    // Outer container with a refreshing gradient background, taking up the full viewport height
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        {/* Header Section */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {/* Error Message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={submit} className="space-y-5">
          {/* Name Input */}
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-gray-500 text-gray-900"
            type="text"
            aria-label="Full Name"
          />

          {/* Email Input */}
          <input
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-gray-500 text-gray-900"
            type="email"
            aria-label="Email Address"
          />

          {/* Password Input */}
          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            placeholder="Password (min 6 characters)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-gray-500 text-gray-900"
            aria-label="Password"
          />

          {/* Role Select Dropdown */}
          <div className="relative">
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              className="w-full p-3 border border-gray-300 bg-white rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 text-gray-700"
              aria-label="Select Role"
            >
              <option value="CUSTOMER">I am a Customer</option>
              <option value="SHOP_OWNER">I am a Shop Owner</option>
            </select>
            {/* Custom Arrow for select box */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-[1.01] cursor-pointer"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-600 hover:text-purple-800 font-medium cursor-pointer"
          >
            Log In Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
