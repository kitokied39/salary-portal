import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EmployeeProtectedRoute({ children }) {
  const { employeeToken } = useAuth();
  const location = useLocation();

  if (!employeeToken) {
    return <Navigate to="/employee-login" state={{ from: location }} replace />;
  }
  return children;
}
