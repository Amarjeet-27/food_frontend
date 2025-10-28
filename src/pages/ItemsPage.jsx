import { useEffect, useState } from "react";
import useAuth from "../context/UseAuth";
import { Link } from "react-router-dom";
import api from "../api/axios";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  // ✅ Fetch all items
  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await api.get("/items");
        setItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  // ✅ Handle quantity update (prevent exceeding stock)
  const handleQuantityChange = (itemId, value, stock) => {
    const quantity = Math.max(1, Math.min(value, stock));
    setCart((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, quantity } : it))
    );
  };

  // ✅ Add to cart
  const handleAddToCart = (item) => {
    if (!item.stock) {
      alert("Item is unavailable!");
      return;
    }
    setCart((prev) => {
      const existing = prev.find((it) => it.id === item.id);
      if (existing) {
        alert("Item already in cart!");
        return prev;
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // ✅ Remove from cart
  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  };

  // ✅ Confirm order (POST request)
  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const orderData = {
        customerEmail: user?.sub, // adjust based on your backend model
        customerPhone: "6201478952",
        customerAddress: "Hyderabad",
        items: cart.map((it) => ({
          itemId: it.id,
          quantity: it.quantity,
        })),
      };

      const res = await api.post("/orders", orderData);
      alert("Order placed successfully!");
      console.log("Order response:", orderData);
      console.log("Order response:", user);
      setCart([]); // clear cart after successful order
    } catch (err) {
      console.error(err);
      alert("Failed to place order!");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Items</h2>
        {user?.role === "SHOP" && (
          <Link
            to="/shop/items/new"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Add Item
          </Link>
        )}
      </div>

      {/* 🛒 Cart Section */}
      {cart.length > 0 && (
        <div className="mb-4 p-4 bg-gray-100 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">🛍️ Your Cart</h3>
            <button
              onClick={() => setCart([])}
              className="text-sm text-red-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          {cart.map((it) => (
            <div
              key={it.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <span className="font-medium">{it.name}</span>{" "}
                <span className="text-sm text-gray-600">(₹{it.price})</span>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max={it.stock}
                  value={it.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      it.id,
                      Number(e.target.value),
                      it.stock
                    )
                  }
                  className="w-16 border rounded px-2"
                />
                <button
                  onClick={() => handleRemoveFromCart(it.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-3 font-semibold text-right">
            Total: ₹
            {cart
              .reduce((sum, it) => sum + it.price * it.quantity, 0)
              .toFixed(2)}
          </div>

          <div className="flex justify-end mt-3">
            <button
              onClick={handleConfirmOrder}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}

      {/* 🧺 Items List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((it) => {
          const selected = cart.find((c) => c.id === it.id);
          return (
            <div key={it.id} className="bg-white p-4 rounded shadow">
              <div className="mt-2 flex justify-between items-center">
                <h3 className="font-semibold">{it.name}</h3>
                <div
                  className={`px-2 py-1 text-sm rounded ${
                    it.stock ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {it.stock ? "Available" : "Unavailable"}
                </div>
              </div>

              <p className="text-sm text-gray-700 mt-1">{it.description}</p>

              <div className="mt-2 flex justify-between items-center">
                <div className="text-lg font-medium">₹{it.price}</div>

                {selected ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      max={it.stock}
                      value={selected.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          it.id,
                          Number(e.target.value),
                          it.stock
                        )
                      }
                      className="w-16 border rounded px-2"
                    />
                  </div>
                ) : (
                  <button
                    disabled={!it.stock}
                    onClick={() => handleAddToCart(it)}
                    className="px-2 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsPage;
