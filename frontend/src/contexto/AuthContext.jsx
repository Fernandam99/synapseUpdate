import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api"; // asumo que es un axios instance


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Asegura header Authorization para las siguientes llamadas
        api.defaults.headers.common = api.defaults.headers.common || {};
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const res = await api.get("/auth/me");
          const payload = res?.data ?? res;
          // Apoya varias formas (usuario en payload.usuario, payload.user o payload mismo)
          const usuario = payload.usuario ?? payload.user ?? payload;
          setUser(usuario);
        } catch (err) {
          console.error("AuthProvider: fallo /auth/me", err);
          localStorage.removeItem("token");
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async (correo, password) => {
    const res = await api.post("/auth/login", { correo, password });
    const data = res?.data ?? res;
    const token = data.access_token ?? data.token;
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common = api.defaults.headers.common || {};
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const usuario = data.usuario ?? data.user ?? data;
    setUser(usuario);
    return data;
  };

  const register = async (userData) => {
    const res = await api.post("/auth/register", userData);
    const data = res?.data ?? res;
    const token = data.access_token ?? data.token;
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common = api.defaults.headers.common || {};
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const usuario = data.usuario ?? data.user ?? data;
    setUser(usuario);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    if (api.defaults.headers && api.defaults.headers.common) {
      delete api.defaults.headers.common["Authorization"];
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
