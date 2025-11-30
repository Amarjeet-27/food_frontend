import { useState } from "react";
import useAuth from "../context/UseAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await login({ email, password });
    if (!res.ok) return setError(res.error);
    // redirect based on role
    const token = localStorage.getItem("token");
    console.log("Token after login:", token);
    const route = res.role === "SHOP_OWNER" ? "/shop" : "/customer";
    navigate(route);
    // if role not included in response, decode token
  };

  return (
    // Outer container with a gradient background, taking up the full viewport height
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl border border-gray-200 transform transition duration-500 hover:shadow-3xl">
        {/* Header Section */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {/* Error Message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={submit} className="space-y-6">
          {/* Email Input */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out placeholder-gray-500 text-gray-900"
            type="email"
            aria-label="Email Address"
          />

          {/* Password Input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out placeholder-gray-500 text-gray-900"
            aria-label="Password"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-[1.01] cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
