import { Navigate, useLocation } from "react-router-dom";

// The two 'anonymous' routes in this application are /register and /login.
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

  // If a user is not logged in and tries to access a route that requires authorization, redirect them to the /login route.
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Otherwise, display the children of the current route.
  return children;
}
