import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const roleRedirects = {
  admin: "/admin/dashboard",
  driver: "/driver/home",
  customer: "/customer/home",
};

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isLoggedIn, role } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={roleRedirects[role] || "/"} replace />;
  }

  return children;
}