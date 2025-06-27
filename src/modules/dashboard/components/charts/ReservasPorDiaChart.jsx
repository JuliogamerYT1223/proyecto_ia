import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { dia: "Lun", reservas: 12 },
  { dia: "Mar", reservas: 18 },
  { dia: "Mié", reservas: 10 },
  { dia: "Jue", reservas: 22 },
  { dia: "Vie", reservas: 25 },
  { dia: "Sáb", reservas: 30 },
  { dia: "Dom", reservas: 16 },
];

export default function ReservasPorDiaChart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold text-red-900 mb-2">
        Reservas por día
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="reservas"
            stroke="#991B1B"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
