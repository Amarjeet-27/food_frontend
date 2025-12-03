import React, { useCallback, useMemo, useState } from "react";
import useAuth from "../context/UseAuth";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const roleOptions = useMemo(
    () => [
      { value: "CUSTOMER", label: "I am a Customer" },
      { value: "SHOP_OWNER", label: "I am a Shop Owner" },
    ],
    []
  );

  const validate = useCallback((values) => {
    const errs = {};
    if (!values.name.trim()) errs.name = "Please enter your full name.";
    if (!values.email.trim()) errs.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      errs.email = "Please enter a valid email.";
    if (!values.password) errs.password = "Please choose a password.";
    else if (values.password.length < 6)
      errs.password = "Password should be at least 6 characters.";
    return errs;
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // clear error for that field if present
    setError((prev) => (prev && prev.field === name ? null : prev));
  }, []);

  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(false);

      // trim fields before validation/submission
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      };

      const errs = validate(payload);
      if (Object.keys(errs).length > 0) {
        // show the first error (you can expand to show all)
        const firstKey = Object.keys(errs)[0];
        setError({ message: errs[firstKey], field: firstKey });
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await register(payload);
        // your register function shape: expecting { ok, error } as earlier
        if (!res?.ok) {
          setError({
            message: res?.error || "Registration failed. Try again.",
          });
          setIsSubmitting(false);
          return;
        }

        setSuccess(true);
        // small delay so user sees success (optional)
        setTimeout(() => navigate("/login"), 900);
      } catch (err) {
        console.error(err);
        setError({ message: err?.message || "Unexpected error. Try again." });
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, register, validate, navigate]
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create Account
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Create an account to order or manage your shop.
        </p>

        {/* Error / Success */}
        {error?.message && (
          <div
            role="alert"
            aria-live="assertive"
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
          >
            {error.message}
          </div>
        )}

        {success && (
          <div
            role="status"
            aria-live="polite"
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4"
          >
            Registration successful — redirecting to login...
          </div>
        )}

        <form onSubmit={submit} className="space-y-4" noValidate>
          <div>
            <label className="sr-only" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              autoComplete="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition placeholder-gray-500 text-gray-900"
              type="text"
              aria-invalid={error?.field === "name" ? "true" : "false"}
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              autoComplete="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition placeholder-gray-500 text-gray-900"
              type="email"
              aria-invalid={error?.field === "email" ? "true" : "false"}
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password (min 6 characters)"
              autoComplete="new-password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition placeholder-gray-500 text-gray-900"
              type="password"
              aria-invalid={error?.field === "password" ? "true" : "false"}
            />
          </div>

          <div className="relative">
            <label className="sr-only" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 bg-white rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-gray-700"
            >
              {roleOptions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-white font-semibold rounded-lg shadow-md transition transform ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500 focus:ring-opacity-30"
            }`}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Registering…" : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
