import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SynapseApp from "./App";
import { AuthProvider } from "./contexto/AuthContext";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter> {/* la app está dentro de un Router */}
        <SynapseApp />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
