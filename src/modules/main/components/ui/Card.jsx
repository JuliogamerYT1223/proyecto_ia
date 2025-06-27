const API_BASE_URL = import.meta.env.VITE_SOME_KEY;

export default function ProductCard({
  nombre,
  precio,
  descripcion,
  disponible,
  imagen,
}) {
  return (
    <div className="card bg-base-100 w-full shadow-md">
      <figure className="h-60 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={`${API_BASE_URL}/${imagen}`}
          alt={nombre}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-between">
          {nombre}
          <div className="badge bg-red-900 text-sm text-white font-poppins border-none">
            S/ {precio.toFixed(2)}
          </div>
        </h2>
        <p>{descripcion}</p>
        <div className="card-actions justify-end">
          <div
            className={`badge badge-outline ${
              disponible
                ? "text-red-900 border-red-800"
                : "text-gray-500 border-gray-400"
            }`}
          >
            {disponible ? "Disponible" : "Próximamente"}
          </div>
        </div>
      </div>
    </div>
  );
}
