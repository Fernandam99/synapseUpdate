import { Navigate } from "react-router-dom";

export default function PrivateRoute({ user, children }) {
  console.log("PrivateRoute:", user ? "✅ acceso permitido" : "❌ acceso denegado");
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
