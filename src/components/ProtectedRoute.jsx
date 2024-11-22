import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  isLoggedIn,
  children,
  anonymous = false,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";

  // If the user is logged in redirect them away from our anonymous routes.
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  // Otherwise, display the children of the current route.
  return children;
}
