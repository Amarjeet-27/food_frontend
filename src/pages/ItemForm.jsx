import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ItemForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    available: true,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/items", form);
      navigate("/shop/items");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Create Item</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm((f) => ({ ...f, price: Number(e.target.value) }))
          }
          placeholder="Price"
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) =>
              setForm((f) => ({ ...f, available: e.target.checked }))
            }
          />{" "}
          Available
        </label>
        <button className="w-full py-2 bg-blue-600 text-white rounded">
          Save
        </button>
      </form>
    </div>
  );
}
