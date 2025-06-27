import { useState } from "react";

export default function Tables() {
  const [mesas, setMesas] = useState([]);
  const [nuevaMesa, setNuevaMesa] = useState({
    nombre: "",
    capacidad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaMesa((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nuevaMesa.nombre || !nuevaMesa.capacidad) return;

    setMesas((prev) => [...prev, { ...nuevaMesa }]);
    setNuevaMesa({
      nombre: "",
      capacidad: "",
    });
  };

  return (
    <div className="p-6 font-poppins">
      <h2 className="text-2xl font-bold text-red-900 mb-6">Agregar nueva mesa</h2>

      <form onSubmit={handleAgregar} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow">
        <div>
          <label className="block text-sm mb-1 text-gray-700 font-medium">Nombre o Número</label>
          <input
            type="text"
            name="nombre"
            value={nuevaMesa.nombre}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Ej: Mesa 1"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-700 font-medium">Capacidad</label>
          <input
            type="number"
            name="capacidad"
            value={nuevaMesa.capacidad}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Ej: 4"
            required
          />
        </div>

        <div className="md:col-span-2 text-right">
          <button type="submit" className="btn bg-red-900 text-white hover:bg-red-800">
            Agregar mesa
          </button>
        </div>
      </form>

      {/* Lista de mesas */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-red-900 mb-4">Mesas registradas</h3>
        {mesas.length === 0 ? (
          <p className="text-gray-500">No hay mesas registradas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mesas.map((mesa, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow border border-gray-200">
                <h4 className="text-lg font-bold text-red-900">{mesa.nombre}</h4>
                <p className="text-gray-700">Capacidad: {mesa.capacidad} personas</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
