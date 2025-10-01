import { Navigate } from "react-router-dom";

export default function PrivateRoute({ user, children }) {
  console.log("🟣 PrivateRoute check:", user);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
