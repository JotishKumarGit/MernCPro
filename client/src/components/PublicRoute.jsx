import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  // If user is logged in, prevent access to login/register
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}



