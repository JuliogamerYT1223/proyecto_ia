import { useState } from "react";

export default function Menu() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoProducto((prev) => ({
          ...prev,
          imagen: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return;

    setProductos((prev) => [...prev, { ...nuevoProducto }]);
    setNuevoProducto({
      nombre: "",
      descripcion: "",
      precio: "",
      imagen: "",
    });
  };

  return (
    <div className="p-6 font-poppins">
      <h2 className="text-2xl font-bold text-red-900 mb-6">
        Agregar nuevo producto
      </h2>

      <form
        onSubmit={handleAgregar}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow"
      >
        <div>
          <label className="block text-sm mb-1 text-gray-700 font-medium">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={nuevoProducto.nombre}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-700 font-medium">
            Precio
          </label>
          <input
            type="number"
            name="precio"
            value={nuevoProducto.precio}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1 text-gray-700 font-medium">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={nuevoProducto.descripcion}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={3}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1 text-gray-700 font-medium">
            Imagen del producto
          </label>
          <input
            type="file"
            name="imagen"
            className="file-input w-full file-input-bordered"
            onChange={handleImageChange}
          />
        </div>

        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            className="btn bg-red-900 text-white hover:bg-red-800"
          >
            Agregar producto
          </button>
        </div>
      </form>

      {/* Lista de productos */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-red-900 mb-4">
          Productos disponibles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productos.length === 0 ? (
            <p className="text-gray-500">No hay productos aún.</p>
          ) : (
            productos.map((prod, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow">
                {prod.imagen && (
                  <img
                    src={prod.imagen}
                    alt={prod.nombre}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h4 className="text-lg font-bold text-red-900">
                  {prod.nombre}
                </h4>
                <p className="text-sm text-gray-600">{prod.descripcion}</p>
                <p className="mt-2 text-red-800 font-semibold">
                  S/. {parseFloat(prod.precio).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
