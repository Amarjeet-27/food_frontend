import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../context/UseAuth";
import { Link } from "react-router-dom";
import api from "../api/axios";

// Attractive & responsive ItemsPage for customers
// - responsive grid of food cards
// - sticky cart sidebar on desktop, bottom drawer on mobile
// - image fallback using loremflickr food images (stable with ?lock=)
// - animations via framer-motion
// - Times New Roman font per user preference

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    async function fetchItems() {
      try {
        const res = await api.get("/items/customer");
        if (!mounted) return;
        const data = (res.data || []).map((it) => ({
          ...it,
          image: it.image || `https://foodish-api.com/images/pizza/pizza1.jpg`,
          category: it.category || "General",
        }));
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
    return () => (mounted = false);
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(items.map((i) => i.category))),
  ];

  // filter + search
  const visible = items.filter((it) => {
    if (category !== "All" && it.category !== category) return false;
    if (!query.trim()) return true;
    return (
      it.name.toLowerCase().includes(query.toLowerCase()) ||
      (it.description || "").toLowerCase().includes(query.toLowerCase())
    );
  });

  // cart helpers
  const addToCart = (item) => {
    if (!item.stock) return;
    setCart((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      if (exist)
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: Math.min(p.quantity + 1, item.stock) }
            : p
        );
      return [...prev, { ...item, quantity: 1 }];
    });
    setDrawerOpen(true);
  };

  const updateQuantity = (id, qty, stock) => {
    const q = Math.max(1, Math.min(qty, stock));
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: q } : p))
    );
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  const clearCart = () => setCart([]);

  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0);

  const confirmOrder = async () => {
    if (cart.length === 0) return alert("Your cart is empty");
    try {
      const orderData = {
        customerEmail: user?.sub || "guest@example.com",
        customerPhone: "",
        customerAddress: "",
        items: cart.map((c) => ({ itemId: c.id, quantity: c.quantity })),
      };
      await api.post("/orders", orderData);
      alert("Order placed — thank you!");
      clearCart();
      setDrawerOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Explore Dishes
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Tasty meals from nearby kitchens. Fast delivery & fresh taste.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes, e.g. 'Biryani'"
                className="w-full md:w-80 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            <div className="hidden md:flex items-center gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 rounded-lg border"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="px-3 py-2 rounded-lg border bg-white"
              >
                Reset
              </button>
            </div>

            {/* Cart button for mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setDrawerOpen(true)}
                className="relative inline-flex items-center px-3 py-2 bg-amber-400 text-black rounded-lg"
              >
                🛒
                <span className="ml-2 font-medium">{cart.length}</span>
                <span className="sr-only">Open cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* layout: main grid + sticky cart on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* product grid spans 2 cols on md */}
          <div className="md:col-span-2">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-white p-4 rounded-lg shadow"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((it) => (
                  <motion.article
                    key={it.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden flex flex-col"
                  >
                    <div className="relative h-40 md:h-44 w-full">
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-full h-full object-cover"
                      />
                      {/* <div className="absolute left-3 top-3 bg-white/90 rounded-full px-3 py-1 text-xs font-semibold">
                        {it.category}
                      </div> */}
                      <div
                        className={`absolute right-3 top-3 text-xs font-semibold px-2 py-1 rounded-full ${
                          it.stock
                            ? "bg-green-600 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {it.stock ? "In stock" : "Out"}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{it.name}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {it.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold">
                            ₹{Number(it.price).toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-400">
                            Rating: {it.rating || "5"}
                          </div>
                        </div>

                        <div>
                          <button
                            onClick={() => addToCart(it)}
                            disabled={!it.stock}
                            className="px-3 py-2 rounded-lg bg-amber-400 text-black font-medium hover:bg-amber-500 disabled:opacity-60"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>

          {/* Cart sidebar on md+ */}
          <div className="hidden md:block">
            <div className="sticky top-6 bg-white p-4 rounded-2xl shadow border">
              <h3 className="font-semibold text-lg">Your Cart</h3>
              <p className="text-sm text-gray-500 mt-1">{cart.length} items</p>

              <div className="mt-4 space-y-3">
                {cart.length === 0 && (
                  <div className="text-sm text-gray-500">
                    Cart is empty — add tasty items!
                  </div>
                )}

                {cart.map((c) => (
                  <div key={c.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-12 h-10 object-cover rounded-md"
                      />
                      <div>
                        <div className="text-sm font-medium">{c.name}</div>
                        <div className="text-xs text-gray-400">₹{c.price}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max={c.stock}
                        value={c.quantity}
                        onChange={(e) =>
                          updateQuantity(c.id, Number(e.target.value), c.stock)
                        }
                        className="w-16 border rounded px-2 py-1 text-sm"
                      />
                      <button
                        onClick={() => removeFromCart(c.id)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-right font-semibold">
                Total: ₹{total.toFixed(2)}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={clearCart}
                  disabled={cart.length === 0}
                  className="flex-1 px-3 py-2 rounded-lg border"
                >
                  Clear
                </button>
                <button
                  onClick={confirmOrder}
                  disabled={cart.length === 0}
                  className="flex-1 px-3 py-2 rounded-lg bg-green-600 text-white"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer cart */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 300 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 md:hidden"
          >
            <div className="bg-white rounded-t-2xl shadow p-4 border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Your Cart ({cart.length})</h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="text-sm text-gray-500"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="space-y-3 max-h-60 overflow-auto">
                {cart.length === 0 && (
                  <div className="text-sm text-gray-500">No items in cart</div>
                )}
                {cart.map((c) => (
                  <div key={c.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-12 h-10 object-cover rounded-md"
                      />
                      <div>
                        <div className="text-sm font-medium">{c.name}</div>
                        <div className="text-xs text-gray-400">₹{c.price}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max={c.stock}
                        value={c.quantity}
                        onChange={(e) =>
                          updateQuantity(c.id, Number(e.target.value), c.stock)
                        }
                        className="w-16 border rounded px-2 py-1 text-sm"
                      />
                      <button
                        onClick={() => removeFromCart(c.id)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-right font-semibold">
                Total: ₹{total.toFixed(2)}
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    clearCart();
                  }}
                  disabled={cart.length === 0}
                  className="flex-1 px-3 py-2 rounded-lg border"
                >
                  Clear
                </button>
                <button
                  onClick={() => {
                    confirmOrder();
                  }}
                  disabled={cart.length === 0}
                  className="flex-1 px-3 py-2 rounded-lg bg-green-600 text-white"
                >
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
