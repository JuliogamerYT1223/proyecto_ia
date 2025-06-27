import { useState, useEffect } from "react";

export default function Customers() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Datos simulados
    setClientes([
      {
        id: 1,
        nombre: "Carlos Reyes",
        correo: "carlos@vinasreyes.com",
        telefono: "987654321",
        rol: "CLIENTE",
        fecha: "20/06/2025",
        diasSinEntrar: 5,
      },
      {
        id: 2,
        nombre: "Lucía Gómez",
        correo: "lucia@gmail.com",
        telefono: "912345678",
        rol: "CLIENTE",
        fecha: "18/06/2025",
        diasSinEntrar: 12,
      },
    ]);
  }, []);

  const eliminarCliente = (id) => {
    const confirmado = confirm("¿Estás seguro de eliminar este cliente?");
    if (confirmado) {
      setClientes((prev) => prev.filter((cliente) => cliente.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-red-900">Clientes registrados</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-red-900 text-white">
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Fecha registro</th>
              <th>Días sin entrar</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.rol}</td>
                <td>{cliente.fecha}</td>
                <td className={cliente.diasSinEntrar > 10 ? "text-red-600 font-semibold" : ""}>
                  {cliente.diasSinEntrar} días
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => eliminarCliente(cliente.id)}
                  >
                    <i className="fas fa-trash-alt mr-1" /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {clientes.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No hay clientes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
