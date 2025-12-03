import React, { useEffect, useState } from "react";
import useAuth from "../context/UseAuth";
import { Link } from "react-router-dom";
import api from "../api/axios";

// Attractive Shop Items page using TailwindCSS
// Responsive grid, search, category pills, skeleton loader, and card actions
export default function ShopItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    async function fetchItems() {
      try {
        const res = await api.get("/items");
        if (!mounted) return;
        // ensure each item has an image placeholder
        const data = (res.data || []).map((it) => ({
          ...it,
          image:
            it.image ||
            `https://source.unsplash.com/600x400/?food,${encodeURIComponent(
              it.name
            )}`,
          category: it.category || "General",
        }));

        setItems(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let list = items;
    if (category !== "All") list = list.filter((i) => i.category === category);
    if (query.trim())
      list = list.filter((i) =>
        i.name.toLowerCase().includes(query.toLowerCase())
      );
    setFiltered(list);
  }, [query, category, items]);

  const categories = [
    "All",
    ...Array.from(new Set(items.map((i) => i.category))),
  ];

  return (
    <div
      className="min-h-screen p-8 bg-gradient-to-b from-white to-gray-100"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Our Collection
            </h1>
            {/* <p className="mt-1 text-gray-500">
              Hand-picked items — quality first. Browse, search, and manage your
              shop.
            </p> */}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {user?.role === "SHOP_OWNER" && (
              <Link
                to="/shop/items/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
              >
                Add Item
              </Link>
            )}
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-2xl p-4 shadow"
              >
                <div className="h-40 bg-gray-200 rounded-md mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="flex items-center justify-between">
                  <div className="h-8 bg-gray-200 rounded w-20" />
                  <div className="h-8 bg-gray-200 rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl p-8 text-center text-gray-500">
                No items found. Try a different search or add new products.
              </div>
            ) : (
              filtered.map((item) => (
                <article
                  key={item.id || item._id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                >
                  <div className="relative h-48 md:h-56">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                    <div
                      className={`absolute right-3 top-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        item.stock > 0
                          ? "bg-green-600 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {item.stock > 0
                        ? `${item.stock} in stock`
                        : "Out of stock"}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">
                          ₹{Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button className="flex-1 px-4 py-2 rounded-lg border hover:bg-gray-50">
                        Add to cart
                      </button>
                      <Link
                        to={`/shop/items/${item.id || item._id}`}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                      >
                        View
                      </Link>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <span>Rating: {item.rating || "5"}</span>
                      <span>Reviews: {item.reviewsCount || 10}</span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        )}
      </div>
    </div>
  );
}
