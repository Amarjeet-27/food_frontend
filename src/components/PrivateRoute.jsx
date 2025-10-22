import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/UseAuth.jsx";

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
