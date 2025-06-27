import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { validateField } from "../utils/validateForm";

const API_BASE_URL = import.meta.env.VITE_SOME_KEY;

export default function useAuthForm(isLogin, onLoginSuccess) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errores, setErrores] = useState({});
  const [touched, setTouched] = useState({});
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const resetForm = () => {
    setNombre("");
    setCorreo("");
    setPassword("");
    setTelefono("");
    setErrores({});
    setTouched({});
    setMensaje("");
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setErrores((prev) => ({
      ...prev,
      [e.target.name]: validateField(e.target.name, e.target.value),
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrores((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nombre,
      correo,
      password,
      telefono,
    };

    const camposAValidar = isLogin ? { correo, password } : formData;

    const nuevosErrores = {};
    Object.entries(camposAValidar).forEach(([campo, valor]) => {
      const error = validateField(campo, valor);
      if (error) nuevosErrores[campo] = error;
    });

    setErrores(nuevosErrores);
    setTouched(
      Object.keys(camposAValidar).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    if (Object.keys(nuevosErrores).length > 0) return;

    try {
      if (isLogin) {
        const response = await axios.post(`${API_BASE_URL}/api/login`, {
          correo,
          password,
        });

        const usuario = response.data;
        setMensaje("Inicio de sesión exitoso");

        // Guardar usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify(usuario));

        // Notificar al componente padre que se logueó
        if (onLoginSuccess) onLoginSuccess(usuario);

        // Redirigir
        if (usuario.rol === 0) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }

        // Cerrar modal
        document.getElementById("auth_modal")?.close();
        resetForm();
      } else {
        await axios.post(`${API_BASE_URL}/api/user`, {
          nombre,
          correo,
          password,
          telefono,
        });

        setMensaje("Registro exitoso");
        resetForm();
      }
    } catch (err) {
      console.error(err);

      if (err.response) {
        setMensaje(err.response.data.detail || "Error inesperado");
      } else {
        setMensaje("Error al conectar con el servidor");
      }
    }
  };

  return {
    nombre,
    correo,
    password,
    telefono,
    errores,
    touched,
    mensaje,
    handleChange,
    handleBlur,
    handleSubmit,
    setNombre,
    setCorreo,
    setPassword,
    setTelefono,
    resetForm,
  };
}
