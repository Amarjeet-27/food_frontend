import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ItemForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  }

  function validate() {
    const err = {};
    if (!form.name?.trim()) err.name = "Name is required";
    if (!form.description?.trim()) err.description = "Description is required";
    if (Number(form.price) <= 0) err.price = "Price must be greater than 0";
    if (Number(form.stock) < 0) err.stock = "Stock cannot be negative";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return; // validate before submit

    try {
      await api.post("/items", form);
      navigate("/shop/items");
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Unknown error");
    }
  };

  function resetForm() {
    setForm({ name: "", description: "", price: 0, stock: 0 });
    setImage(null);
    if (fileRef.current) fileRef.current.value = "";
    setErrors({});
    setError(null);
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center p-6"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <div className="max-w-3xl w-full flex justify-center items-center">
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 border border-gray-200 w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Add / Edit Product
          </h2>
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Product name */}
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Product name
              </span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                  errors.name ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="e.g. Pizza Margherita"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </label>

            {/* Description */}
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Short description
              </span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className={`mt-1 block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                  errors.description ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Write a short and punchy description"
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description}
                </p>
              )}
            </label>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <label>
                <span className="text-sm font-medium text-gray-700">
                  Price (₹)
                </span>
                <input
                  type="number"
                  step="10"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                    errors.price ? "border-red-300" : "border-gray-200"
                  }`}
                />
                {errors.price && (
                  <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                )}
              </label>

              <label>
                <span className="text-sm font-medium text-gray-700">Stock</span>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                    errors.stock ? "border-red-300" : "border-gray-200"
                  }`}
                />
                {errors.stock && (
                  <p className="text-xs text-red-500 mt-1">{errors.stock}</p>
                )}
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 justify-end">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
              >
                Save Product
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
