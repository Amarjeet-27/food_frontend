import { Link } from "react-router-dom";
import useAuth from "../context/UseAuth";
    

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-semibold text-lg">
          FoodDelivery
        </Link>
        {user ? (
          <>
            {user.role === "SHOP" ? (
              <Link to="/api/items">Shop</Link>
            ) : (
              <Link to="/api/customer">Customer</Link>
            )}
            <button onClick={logout} className="px-3 py-1 border rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/register"
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar