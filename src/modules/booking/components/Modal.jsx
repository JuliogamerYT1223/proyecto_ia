import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthForm from "../hooks/useAuthForm";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

export default function Modal() {
  const [isLogin, setIsLogin] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  const authModalRef = useRef(null);
  const location = useLocation();
  const currentPath = location.pathname;
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  useEffect(() => {
    const modal = authModalRef.current;
    const handleClose = () => {
      const usuarioGuardado = localStorage.getItem("usuario");
      if (!usuarioGuardado) {
        navigate("/");
      }
    };

    if (modal) {
      modal.addEventListener("close", handleClose);
    }

    return () => {
      if (modal) {
        modal.removeEventListener("close", handleClose);
      }
    };
  }, [navigate]);

  const handleLoginSuccess = (user) => {
    setUsuario(user);
    document.getElementById("auth_modal")?.close();
    resetForm();
    setIsLogin(true);
  };

  const {
    nombre,
    correo,
    password,
    telefono,
    errores,
    touched,
    mensaje,
    handleSubmit,
    handleChange,
    handleBlur,
    setNombre,
    setCorreo,
    setPassword,
    setTelefono,
    resetForm,
  } = useAuthForm(isLogin, handleLoginSuccess, currentPath);

  const handleOpenModal = () => {
    if (usuario) {
      document.getElementById("logout_modal")?.showModal();
    } else {
      resetForm();
      setIsLogin(true);
      document.getElementById("auth_modal")?.showModal();
    }
  };

  const handleToggleMode = () => {
    setIsLogin((prev) => !prev);
    resetForm();
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    resetForm();
    setIsLogin(true);
    document.getElementById("logout_modal")?.close();
    navigate("/");
  };

  return (
    <>
      <button
        className="btn shadow-none font-poppins"
        onClick={handleOpenModal}
      >
        <i className="fa-solid fa-user mr-1"></i>{" "}
        {usuario ? usuario.nombre.toUpperCase() : "Mi Cuenta"}
      </button>

      <dialog
        id="auth_modal"
        ref={authModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-4 text-center font-poppins">
            {isLogin ? "Viña los Reyes" : "Crear Cuenta"}
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <TextInput
                name="nombre"
                label="Nombre"
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={handleChange(setNombre)}
                onBlur={handleBlur}
                error={errores.nombre}
                touched={touched.nombre}
              />
            )}

            <TextInput
              name="correo"
              label="Correo electrónico"
              type="email"
              placeholder="Tu correo"
              value={correo}
              onChange={handleChange(setCorreo)}
              onBlur={handleBlur}
              error={errores.correo}
              touched={touched.correo}
            />

            <TextInput
              name="password"
              label="Contraseña"
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={handleChange(setPassword)}
              onBlur={handleBlur}
              error={errores.password}
              touched={touched.password}
            />

            {!isLogin && (
              <TextInput
                name="telefono"
                label="Teléfono"
                type="tel"
                placeholder="Tu teléfono"
                value={telefono}
                onChange={handleChange(setTelefono)}
                onBlur={handleBlur}
                error={errores.telefono}
                touched={touched.telefono}
              />
            )}

            <Button type="submit" className="w-full">
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </Button>
          </form>

          {mensaje && (
            <p className="text-center mt-4 text-green-600 font-medium">
              {mensaje}
            </p>
          )}

          <div className="text-center mt-4">
            <p className="text-sm font-poppins">
              {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
              <button
                onClick={handleToggleMode}
                className="ml-2 text-red-900 hover:underline cursor-pointer"
              >
                {isLogin ? "Regístrate" : "Inicia sesión"}
              </button>
            </p>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-red-900 text-white border-none shadow-none font-poppins">
                Cerrar
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="logout_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold font-poppins text-center mb-2">
            ¿Cerrar sesión?
          </h3>
          <p className="py-2 text-center">
            ¿Estás seguro de que deseas cerrar sesión?
          </p>
          <div className="modal-action justify-center gap-4">
            <button
              className="btn bg-red-900 text-white border-none"
              onClick={handleLogout}
            >
              Sí, cerrar sesión
            </button>
            <form method="dialog">
              <button className="btn">Cancelar</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
