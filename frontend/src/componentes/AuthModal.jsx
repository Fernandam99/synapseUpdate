import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProgresoBar from "./ProgresoBar"; // Asegúrate de que este componente existe y no tiene errores

export default function AuthModal({
  isOpen,
  defaultMode = "login",
  onClose,
  onLogin,
  onRegister,
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    correo: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLogin, setIsLogin] = useState(defaultMode === "login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState({ message: "", type: "" });

  // Debug: para ver el modo y estado inicial
  useEffect(() => {
    console.log("🔁 useEffect → defaultMode:", defaultMode);
    setIsLogin(defaultMode === "login");
    setFormData({
      username: "",
      correo: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setFlashMessage({ message: "", type: "" });
  }, [defaultMode, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.correo.trim()) newErrors.correo = "Correo requerido";
    if (!formData.password.trim()) newErrors.password = "Contraseña requerida";

    if (!isLogin) {
      if (!formData.username.trim()) {
        newErrors.username = "Nombre de usuario requerido";
      }
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Confirmación requerida";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    setErrors(newErrors);
    console.log("✅ validateForm → errores:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateProgress = () => {
    const total = isLogin ? 2 : 4;
    let filled = 0;

    if (formData.correo) filled++;
    if (formData.password) filled++;
    if (!isLogin) {
      if (formData.username) filled++;
      if (formData.confirmPassword) filled++;
    }

    return Math.round((filled / total) * 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`✍️ handleChange → ${name}:`, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 handleSubmit → enviado");

    if (!validateForm()) {
      console.warn("⚠️ Formulario inválido");
      setFlashMessage({
        message: "Por favor corrige los errores",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const { correo, password, username } = formData;
      console.log("🔐 handleSubmit → Datos enviados:", {
        correo,
        password,
        username,
        modo: isLogin ? "login" : "register",
      });

      if (isLogin) {
        await onLogin(correo, password);
        console.log("✅ Inicio de sesión exitoso");
        setFlashMessage({
          message: "Inicio de sesión exitoso",
          type: "success",
        });
      } else {
        await onRegister({ correo, password, username });
        console.log("🟢 Registro exitoso");
        setFlashMessage({
          message: "Cuenta creada con éxito",
          type: "success",
        });

        console.log("🟢 Registro exitoso, haciendo login automático");
        await onLogin(correo, password);
      }

      console.log("🚀 Redirigiendo a /perfil...");
      onClose();
      navigate("/perfil");
    } catch (err) {
      console.error("❌ Error en autenticación:", err);
      setFlashMessage({
        message: err?.message || "Error en el servidor",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // Evita renderizar si el modal no está abierto

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </h2>

        {flashMessage.message && (
          <div
            className={`px-3 py-2 rounded mb-3 text-sm ${
              flashMessage.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {flashMessage.message}
          </div>
        )}

        {!isLogin && (
          <div className="mb-4">
            <ProgresoBar progress={calculateProgress()} />
            <p className="text-xs text-gray-500 mt-1">
              Completa los campos obligatorios
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <div className="relative">
              <input
                value={formData.username}
                onChange={handleChange}
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                className="w-full border pl-3 py-2.5 rounded-md text-sm focus:ring-2 focus:ring-purple-500"
              />
              {errors.username && (
                <p className="text-xs text-red-600 mt-1">{errors.username}</p>
              )}
            </div>
          )}

          <div className="relative">
            <input
              value={formData.correo}
              onChange={handleChange}
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              className="w-full border pl-3 py-2.5 rounded-md text-sm focus:ring-2 focus:ring-purple-500"
            />
            {errors.correo && (
              <p className="text-xs text-red-600 mt-1">{errors.correo}</p>
            )}
          </div>

          <div className="relative">
            <input
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              className="w-full border pl-3 pr-9 py-2.5 rounded-md text-sm focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {!isLogin && (
            <div className="relative">
              <input
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                className="w-full border pl-3 py-2.5 rounded-md text-sm focus:ring-2 focus:ring-purple-500"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 rounded-md text-sm font-semibold shadow-md hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-60"
          >
            {loading
              ? "Procesando..."
              : isLogin
              ? "Iniciar Sesión"
              : "Registrarse"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600 text-sm">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            className="text-purple-600 font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Regístrate aquí" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}
