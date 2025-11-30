import { useEffect, useState } from "react";
import useAuth from "../context/UseAuth";
import { Link } from "react-router-dom";
import api from "../api/axios";

const ShopItemsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
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
        {user?.role === "SHOP_OWNER" && (
          <Link
            to="/shop/items/new"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Add Item
          </Link>
        )}
      </div>

      {items.map((item) => (
        <div key={item.id} className="border p-4 mb-4 rounded">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600">Price: ₹{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ShopItemsPage;
