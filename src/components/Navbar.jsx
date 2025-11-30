import { Link } from "react-router-dom";
import useAuth from "../context/UseAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* <Link to="/" className="font-semibold text-lg">
          FoodDelivery
        </Link> */}
        <Link to="/" className="text-3xl font-extrabold text-red-600">
          <span className="text-orange-500">Fast</span>Bite
        </Link>
        {console.log(user)}
        {user ? (
          <>
            {user.role === "SHOP_OWNER" ? (
              <Link
                to="/shop/items"
                className="px-3 py-1 text-xl font-bold rounded cursor-pointer"
              >
                Shop
              </Link>
            ) : (
              <div className="">
                <Link
                  to="/customer/dashboard"
                  className="px-3 py-1 text-xl font-bold rounded cursor-pointer"
                >
                  Customer
                </Link>
                <Link
                  to="/customer/items"
                  className="px-3 py-1 text-xl font-bold rounded cursor-pointer"
                >
                  Items
                </Link>
                <Link
                  to="/customer/orders"
                  className="px-3 py-1 text-xl font-bold rounded cursor-pointer"
                >
                  Orders
                </Link>
              </div>
            )}
            <button
              onClick={logout}
              className="px-3 py-1 border rounded font-bold cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 text-xl font-bold rounded cursor-pointer"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
