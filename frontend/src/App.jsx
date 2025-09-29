import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

// Contexto
import { useAuth } from "./contexto/AuthContext";

// Componentes
import AuthModal from "./componentes/AuthModal.jsx";
import Footer from "./componentes/Footer.jsx";
import Navbar from "./componentes/Navbar.jsx";

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

  // Redirigir al perfil cuando hay login exitoso
  useEffect(() => {
    if (user) {
      navigate("/perfil");
    }
  }, [user, navigate]);

  const onAuthClick = (mode = "login") => setAuthModal({ open: true, mode });
  const closeAuthModal = () => setAuthModal({ open: false, mode: "login" });

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
          <Route path="/" element={<HomePage user={user} onAuthClick={onAuthClick} />} />
          <Route path="/pomodoro" element={user ? <PomodoroPage /> : <Navigate to="/" replace />} />
          <Route path="/concentracion" element={user ? <ConcentracionPage /> : <Navigate to="/" replace />} />
          <Route path="/tareas" element={user ? <TareasPage /> : <Navigate to="/" replace />} />
          <Route path="/recompensas" element={user ? <RecompensasPage /> : <Navigate to="/" replace />} />
          <Route path="/meditacion" element={user ? <MeditacionPage /> : <Navigate to="/" replace />} />
          <Route path="/perfil" element={user ? <PerfilPage /> : <Navigate to="/" replace />} />
          <Route path="/sesion" element={user ? <SesionGrupalPage /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

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
