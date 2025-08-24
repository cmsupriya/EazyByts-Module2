import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function PublicRoute({ children }) {
  const { token } = useAuth();
  return token ? <Navigate to="/dashboard" replace /> : children;
}