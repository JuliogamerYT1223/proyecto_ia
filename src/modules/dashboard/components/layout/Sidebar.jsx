import { useEffect, useState } from "react";
import Logo from "../../../../assets/img/logoBlanco.png";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const getLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 text-sm px-3 py-2 rounded font-medium transition ${
      isActive
        ? "bg-white text-red-900"
        : "text-white hover:bg-white hover:text-red-900"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
    window.location.reload(); 
  };

  return (
    <aside className="w-64 h-screen bg-red-950 text-white shadow-md flex flex-col font-poppins">
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-center py-6 bg-red-950">
          <img
            src={Logo}
            alt="Logo Viñas Los Reyes"
            className="w-28 object-contain"
          />
        </div>

        <nav className="px-4 py-4 space-y-2">
          {/* General */}
          <p className="text-xs uppercase text-gray-300 px-2">General</p>
          <ul className="space-y-1">
            <li>
              <NavLink to="/dashboard" end className={getLinkClasses}>
                <i className="fas fa-chart-line w-5" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/reservations" className={getLinkClasses}>
                <i className="fas fa-calendar-check w-5" />
                Reservas
              </NavLink>
            </li>
          </ul>

          {/* Restaurante */}
          <p className="text-xs uppercase text-gray-300 px-2 pt-4">
            Restaurante
          </p>
          <ul className="space-y-1">
            <li>
              <NavLink to="/dashboard/menu" className={getLinkClasses}>
                <i className="fas fa-utensils w-5" />
                Menú
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/tables" className={getLinkClasses}>
                <i className="fas fa-chair w-5" />
                Mesas
              </NavLink>
            </li>
          </ul>

          {/* Gestión */}
          <p className="text-xs uppercase text-gray-300 px-2 pt-4">Gestión</p>
          <ul className="space-y-1">
            <li>
              <NavLink to="/dashboard/customers" className={getLinkClasses}>
                <i className="fas fa-users w-5" />
                Clientes
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/users" className={getLinkClasses}>
                <i className="fa-solid fa-user w-5" />
                Usuarios
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/reports" className={getLinkClasses}>
                <i className="fas fa-chart-pie w-5" />
                Reportes
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/settings" className={getLinkClasses}>
                <i className="fas fa-cogs w-5" />
                Configuración
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Footer con datos del usuario logueado */}
      <div className="border-t border-red-800 px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white text-red-900 flex items-center justify-center overflow-hidden">
          <span className="text-base font-bold leading-none">
            {usuario?.nombre?.charAt(0).toUpperCase() || "U"}
          </span>
        </div>
        <div className="flex-1 overflow-hidden">
          <p
            className="text-sm font-semibold truncate"
            title={usuario?.nombre || ""}
          >
            {usuario?.nombre || "Usuario"}
          </p>
          <p
            className="text-xs text-gray-300 truncate"
            title={usuario?.correo || ""}
          >
            {usuario?.correo || "correo@example.com"}
          </p>
        </div>
        <button title="Cerrar sesión" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt text-white hover:text-red-300 cursor-pointer"></i>
        </button>
      </div>
    </aside>
  );
}
