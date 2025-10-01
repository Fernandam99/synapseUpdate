import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";

// Contexto
import { useAuth } from "./contexto/AuthContext";

// Componentes
import AuthModal from "./componentes/AuthModal.jsx";
import Footer from "./componentes/Footer.jsx";
import Navbar from "./componentes/Navbar.jsx";
import PrivateRoute from "./componentes/PrivateRoute.jsx";

// Páginas
import ConcentracionPage from "./paginas/ConcentracionPage.jsx";
import HomePage from "./paginas/HomePage.jsx";
import MeditacionPage from "./paginas/MeditacionPage.jsx";
import PerfilPage from "./paginas/PerfilPage.jsx";
import PomodoroPage from "./paginas/PomodoroPage.jsx";
import RecompensasPage from "./paginas/RecompensasPage.jsx";
import SesionGrupalPage from "./paginas/SesionGrupalPage.jsx";
import TareasPage from "./paginas/TareasPage.jsx";

export default function SynapseApp() {
  const { user, loading, login, register, logout } = useAuth();
  const [authModal, setAuthModal] = useState({ open: false, mode: "login" });
  const navigate = useNavigate();
  const location = useLocation();

  // DEBUG: muestra en consola para verificar que user cambia como esperas
  // (borra/acomoda luego)
  // eslint-disable-next-line no-console
  console.log("SynapseApp -> user:", user, "location:", location.pathname);

  // Redirigir al perfil solo si está en "/"
  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate("/perfil");
    }
  }, [user, location.pathname, navigate]);

  const onAuthClick = (mode = "login") => {
    setAuthModal({ open: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ open: false, mode: "login" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando Synapse...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} onAuthClick={onAuthClick} onLogout={logout} />

      <main className="flex-1">
        <Routes>
          {/* Ruta pública */}
          <Route
            path="/"
            element={<HomePage user={user} onAuthClick={onAuthClick} />}
          />

          {/* Rutas protegidas con PrivateRoute */}
          <Route
            path="/pomodoro"
            element={
              <PrivateRoute user={user}>
                <PomodoroPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/concentracion"
            element={
              <PrivateRoute user={user}>
                <ConcentracionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tareas"
            element={
              <PrivateRoute user={user}>
                <TareasPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/recompensas"
            element={
              <PrivateRoute user={user}>
                <RecompensasPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/meditacion"
            element={
              <PrivateRoute user={user}>
                <MeditacionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <PrivateRoute user={user}>
                <PerfilPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/sesion"
            element={
              <PrivateRoute user={user}>
                <SesionGrupalPage />
              </PrivateRoute>
            }
          />

          {/* Ruta no encontrada */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Modal de autenticación */}
      <AuthModal
        isOpen={authModal.open}
        defaultMode={authModal.mode}
        onClose={closeAuthModal}
        onLogin={login}
        onRegister={register}
      />
    </div>
  );
}
