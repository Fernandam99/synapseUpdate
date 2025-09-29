import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

// Crear contexto
const AuthContext = createContext(null);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar token al montar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/auth/me")
        .then((data) => setUser(data))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Métodos de auth
  const login = async (correo, password) => {
    const data = await api.post("/auth/login", { correo, password });
    localStorage.setItem("token", data.access_token);
    setUser(data.usuario);
    return data;
  };

  const register = async (userData) => {
    const data = await api.post("/auth/register", userData);
    localStorage.setItem("token", data.access_token);
    setUser(data.usuario);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir contexto
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
