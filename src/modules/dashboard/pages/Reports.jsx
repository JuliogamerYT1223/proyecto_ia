import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dataVentas = [
  { name: "Lun", reservas: 12 },
  { name: "Mar", reservas: 18 },
  { name: "Mié", reservas: 10 },
  { name: "Jue", reservas: 20 },
  { name: "Vie", reservas: 25 },
  { name: "Sáb", reservas: 30 },
  { name: "Dom", reservas: 22 },
];

const productosTop = [
  { nombre: "Pizza Clásica", cantidad: 120 },
  { nombre: "Pizza Vegetariana", cantidad: 98 },
  { nombre: "Pizza Pepperoni", cantidad: 85 },
  { nombre: "Pizza BBQ", cantidad: 60 },
  { nombre: "Pizza Hawaiana", cantidad: 42 },
];

export default function Reports() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-red-900">Reportes Generales</h1>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Reservas esta semana", value: 117 },
          { title: "Clientes nuevos", value: 28 },
          { title: "Total ingresos", value: "S/ 2,400.00" },
          { title: "Platos vendidos", value: 342 },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-xl p-4 text-red-900 space-y-1"
          >
            <p className="text-sm text-gray-500">{item.title}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-lg font-semibold text-red-900 mb-4">Reservas por día</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataVentas}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="reservas" fill="#991b1b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla */}
      <div className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-lg font-semibold text-red-900 mb-4">Top productos más vendidos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2 px-4">Producto</th>
                <th className="py-2 px-4">Cantidad Vendida</th>
              </tr>
            </thead>
            <tbody>
              {productosTop.map((producto, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{producto.nombre}</td>
                  <td className="py-2 px-4">{producto.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
