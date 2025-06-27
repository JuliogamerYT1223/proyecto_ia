import { useEffect, useState } from "react";
import axios from "axios";
import {
  format,
  isAfter,
  isToday,
  parseISO,
  startOfToday,
  getDay,
} from "date-fns";

const API_BASE_URL = import.meta.env.VITE_SOME_KEY;

export default function Reservations() {
  const [filtroNombre, setFiltroNombre] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorFecha, setErrorFecha] = useState("");

  const obtenerReservas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reservas/`);
      if (!response.ok) throw new Error("Error al obtener las reservas");
      const data = await response.json();
      setReservas(data);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const handleCancelar = async (reservaId) => {
    if (!window.confirm("¿Estás seguro de eliminar esta reserva?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/reserva/${reservaId}`);
      alert("🗑️ Reserva eliminada");
      obtenerReservas();
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
      alert("❌ No se pudo eliminar la reserva");
    }
  };

  // 🎯 Validar la fecha seleccionada
  const handleFechaFiltroChange = (e) => {
    const selectedDate = parseISO(e.target.value);
    const dayOfWeek = getDay(selectedDate); // 0=Dom, 1=Lun, ..., 6=Sáb

    if (
      !isToday(selectedDate) &&
      !isAfter(selectedDate, startOfToday()) // debe ser hoy o futuro
    ) {
      setErrorFecha("Solo puedes seleccionar fechas desde hoy en adelante");
      setFechaFiltro("");
      return;
    }

    if ([1, 2, 3].includes(dayOfWeek)) {
      setErrorFecha("No se permiten reservas para lunes, martes ni miércoles");
      setFechaFiltro("");
      return;
    }

    setErrorFecha("");
    setFechaFiltro(e.target.value);
  };

  const reservasFiltradas = reservas.filter((reserva) => {
    const nombreMatch = reserva.nombre_cliente
      .toLowerCase()
      .includes(filtroNombre.toLowerCase());

    const fechaReserva = format(new Date(reserva.fecha_hora), "yyyy-MM-dd");

    const fechaMatch = !fechaFiltro || fechaReserva === fechaFiltro;

    return nombreMatch && fechaMatch;
  });

  return (
    <div className="p-6 font-poppins">
      <h2 className="text-2xl font-semibold text-red-900 mb-4">Reservas</h2>

      <div className="mb-4 flex flex-col md:flex-row md:items-end gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Filtrar por nombre
          </label>
          <input
            type="text"
            placeholder="Ej: Juan Pérez"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Filtrar por fecha
          </label>
          <input
            type="date"
            value={fechaFiltro}
            min={format(new Date(), "yyyy-MM-dd")}
            onChange={handleFechaFiltroChange}
            className="px-4 py-2 border rounded shadow-sm"
          />
          {errorFecha && (
            <p className="text-red-600 text-sm mt-1">{errorFecha}</p>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-red-900 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Cliente</th>
              <th className="px-4 py-2 text-left">Correo</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Personas</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Hora</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Cargando reservas...
                </td>
              </tr>
            ) : reservasFiltradas.length > 0 ? (
              reservasFiltradas.map((reserva) => {
                const fecha = new Date(reserva.fecha_hora);
                return (
                  <tr key={reserva._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{reserva.nombre_cliente}</td>
                    <td className="px-4 py-2">{reserva.correo}</td>
                    <td className="px-4 py-2">{reserva.telefono}</td>
                    <td className="px-4 py-2">{reserva.cantidad_personas}</td>
                    <td className="px-4 py-2">{fecha.toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      {fecha.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleCancelar(reserva._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No se encontraron reservas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
