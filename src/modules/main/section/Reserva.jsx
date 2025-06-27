import { Link } from "react-router-dom";
import reservaImg from "../../../assets/img/reservas.png";

function Reserva() {
  return (
    <div
      id="reserva"
      className="w-full min-h-screen flex items-center justify-center bg-[#FFF7E6]"
    >
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          minHeight: "500px",
          backgroundImage: `url(${reservaImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 text-center px-4 w-full max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-rouge mb-4 leading-tight">
            Sabores que Nacen de la Calidad
          </h2>
          <p className="text-base md:text-lg text-white mb-6 font-poppins leading-relaxed">
            Descubre nuestros vinos y piscos elaborados con ingredientes
            selectos, tradición y pasión. Ven y vive una experiencia única en
            cada copa.
          </p>
          <Link
            to="/booking"
            className="bg-white text-red-900 py-2 px-6 rounded-md hover:bg-red-800 hover:text-white transition-all font-bold"
          >
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Reserva;
