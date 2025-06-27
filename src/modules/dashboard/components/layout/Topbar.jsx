import { useEffect, useState } from "react";

export default function Topbar({ currentPage = "Dashboard" }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex justify-between items-center px-6 py-3 border-b bg-white shadow-sm font-poppins">
      {/* Bienvenida */}
      <div className="text-xl font-bold text-red-900">
        Bienvenido,{" "}
        <span className="font-semibold text-gray-700">
          {usuario?.nombre || "Usuario"}
        </span>
      </div>

      {/* Ubicación actual */}
      <div className="text-sm text-gray-500">
        Ubicación:{" "}
        <span className="font-medium text-gray-700">{currentPage}</span>
      </div>
    </div>
  );
}
