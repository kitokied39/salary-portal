import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicOnlyRoute({ children, type = "admin" }) {
  const { token, employeeToken } = useAuth();

  if (type === "admin" && token) return <Navigate to="/app/dashboard" replace />;
  if (type === "employee" && employeeToken)
    return <Navigate to="/employee-dashboard" replace />;

  return children;
}
