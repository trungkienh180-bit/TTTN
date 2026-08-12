import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminGuard = () => {
  const { user } = useSelector((state) => state.auth);

  if (
    !user ||
    (user.vai_tro !== "QUAN_TRI_VIEN" && user.vai_tro !== "QUAN_TRI_CAP_CAO")
  ) {
    // Redirect to login if not admin
    return <Navigate to="/login" replace />;
  }

  // If authorized, return child routes (Outlet)
  return <Outlet />;
};

export default AdminGuard;
