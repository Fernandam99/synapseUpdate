import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Target, CheckCircle, User, Users, Menu, X } from "lucide-react";
import isotipo from "../static/IMG/isotipo.png";

export default function Navbar({ user, onAuthClick, onLogout }) {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log("Navbar user:", user);
  const navItems = [
    { path: "/", label: "Home", icon: <Home size={18} />, requiresAuth: false },
    { path: "/pomodoro", label: "Pomodoro", icon: <Target size={18} />, requiresAuth: true },
    { path: "/meditacion", label: "Meditación", icon: <CheckCircle size={18} />, requiresAuth: true },
    { path: "/perfil", label: "Perfil", icon: <User size={18} />, requiresAuth: true },
    { path: "/concentracion", label: "Concentración", icon: <Users size={18} />, requiresAuth: true },
    { path: "/tareas", label: "Tareas", icon: <CheckCircle size={18} />, requiresAuth: true },
    { path: "/sesion", label: "Sesión Grupal", icon: <Users size={18} />, requiresAuth: true },
  ];

  const handleClick = (e, item) => {
    console.log("CLICK NAV:", item.path, "user:", user);
    if (item.requiresAuth && !user) {
      e.preventDefault();
      onAuthClick("login");
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <img src={isotipo} alt="Logo" className="h-10 w-10 rounded-full object-contain" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
              Synapse
            </span>
          </Link>

          {/* MENU DESKTOP (lg) */}
          <div className="hidden lg:flex space-x-6">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleClick(e, item)}
                className="flex items-center gap-1 text-gray-700 hover:text-purple-600 transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* MENU TABLET (md-only) */}
          <div className="hidden md:flex lg:hidden space-x-4">
            {navItems.slice(1, 5).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleClick(e, item)}
                className="flex flex-col items-center text-sm text-gray-700 hover:text-purple-600 transition"
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* BOTONES DERECHA (desktop/tablet) */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <button
                  onClick={() => onAuthClick("login")}
                  className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => onAuthClick("register")}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition"
                >
                  Registrarse
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/perfil"
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
                >
                  <User size={18} /> Mi Cuenta
                </Link>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition"
                >
                  Salir
                </button>
              </div>
            )}
          </div>

          {/* BOTÓN HAMBURGUESA (solo móvil) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MENU MÓVIL */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleClick(e, item)}
              className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition w-full text-left"
            >
              {item.icon} {item.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-gray-200 space-y-3">
            {!user ? (
              <>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onAuthClick("login");
                  }}
                  className="w-full px-4 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onAuthClick("register");
                  }}
                  className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition"
                >
                  Registrarse
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/perfil"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition w-full text-left"
                >
                  <User size={18} /> Mi Cuenta
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition"
                >
                  Salir
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
