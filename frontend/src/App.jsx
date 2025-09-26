// src/App.jsx
import { useEffect, useState } from 'react';
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';

// Componentes
import AuthModal from './componentes/AuthModal.jsx';
import Footer from './componentes/Footer.jsx';
import Navbar from './componentes/Navbar.jsx';
import api from './services/api.js';

// Páginas
import ConcentracionPage from './paginas/ConcentracionPage.jsx';
import HomePage from './paginas/HomePage.jsx';
import MeditacionPage from './paginas/MeditacionPage.jsx';
import PerfilPage from './paginas/PerfilPage.jsx';
import PomodoroPage from './paginas/PomodoroPage.jsx';
import RecompensasPage from './paginas/RecompensasPage.jsx';
import SesionGrupalPage from './paginas/SesionGrupalPage.jsx';
import TareasPage from './paginas/TareasPage.jsx';

// ------------------------
// Hook de autenticación
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then((data) => setUser(data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (correo, password) => {
    const data = await api.post('/auth/login', { correo, password });
    localStorage.setItem('token', data.access_token);
    setUser(data.usuario);
    return data;
  };

  const register = async (userData) => {
    const data = await api.post('/auth/register', userData);
    localStorage.setItem('token', data.access_token);
    setUser(data.usuario);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, login, register, logout };
};

// ------------------------
// App principal
export default function SynapseApp() {
  const { user, loading, login, register, logout } = useAuth();
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });

  const onAuthClick = (mode = 'login') => setAuthModal({ open: true, mode });
  const closeAuthModal = () => setAuthModal({ open: false, mode: 'login' });

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
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar
          user={user}
          onAuthClick={onAuthClick}
          onLogout={logout}
        />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage user={user} onAuthClick={onAuthClick} />
              }
            />
            <Route
              path="/pomodoro"
              element={user ? <PomodoroPage user={user} /> : <Navigate to="/" replace />}
            />
            <Route
              path="/concentracion"
              element={user ? <ConcentracionPage user={user} /> : <Navigate to="/" replace />}
            />
            <Route
              path="/tareas"
              element={user ? <TareasPage user={user} /> : <Navigate to="/" replace />}
            />
            <Route
              path="/recompensas"
              element={user ? <RecompensasPage user={user} /> : <Navigate to="/" replace />}
            />
            <Route
              path="/meditacion"
              element={user ? <MeditacionPage user={user} /> : <Navigate to="/" replace />}
            />
            <Route
              path="/perfil"
              element={user ? <PerfilPage user={user} /> : <Navigate to="/" replace />}
            />
            <Route
              path="/sesion"
              element={user ? <SesionGrupalPage user={user} /> : <Navigate to="/" replace />}
            />
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
    </Router>
  );
}