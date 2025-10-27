import { useEffect, useState } from "react";
import useAuth from "../context/UseAuth";
import { Link } from "react-router-dom";
import api from "../api/axios";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((it) => (
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
            <p>{it.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <div className="text-lg">₹{it.price}</div>
              <button className="px-2 py-1 text-sm rounded bg-green-100 cursor-pointer">
                Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;
