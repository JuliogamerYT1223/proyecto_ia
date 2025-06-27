import ReservasPorDiaChart from "../components/charts/ReservasPorDiaChart";
import TrendingItems from "../components/charts/TrendingItems";

export default function DashboardHome() {
  return (
    <div className="p-6 overflow-auto">
      {/* Tarjetas estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-poppins">
        {/* Reservas de hoy */}
        <div className="stat bg-white text-red-900 shadow rounded-xl">
          <div className="stat-figure text-red-800">
            <i className="fas fa-calendar-check text-2xl"></i>
          </div>
          <div className="stat-title text-gray-500">Reservas hoy</div>
          <div className="stat-value">15</div>
          <div className="stat-desc text-gray-400">+3 respecto a ayer</div>
        </div>

        {/* Mesas disponibles */}
        <div className="stat bg-white text-red-900 shadow rounded-xl">
          <div className="stat-figure text-red-800">
            <i className="fas fa-chair text-2xl"></i>
          </div>
          <div className="stat-title text-gray-500">Mesas disponibles</div>
          <div className="stat-value">6</div>
          <div className="stat-desc text-gray-400">De 20 mesas</div>
        </div>

        {/* Clientes atendidos */}
        <div className="stat bg-white text-red-900 shadow rounded-xl">
          <div className="stat-figure text-red-800">
            <i className="fas fa-user-friends text-2xl"></i>
          </div>
          <div className="stat-title text-gray-500">Clientes atendidos</div>
          <div className="stat-value">32</div>
          <div className="stat-desc text-gray-400">↗︎ 8 más que ayer</div>
        </div>

        {/* Reservas pendientes */}
        <div className="stat bg-white text-red-900 shadow rounded-xl">
          <div className="stat-figure text-red-800">
            <i className="fas fa-clock text-2xl"></i>
          </div>
          <div className="stat-title text-gray-500">Reservas pendientes</div>
          <div className="stat-value">8</div>
          <div className="stat-desc text-gray-400">Antes del cierre</div>
        </div>
      </div>

      {/* Gráficos y tendencias */}
      <section className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReservasPorDiaChart />
          <TrendingItems />
        </div>
      </section>
    </div>
  );
}
