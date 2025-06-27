import logoImg from "../../../assets/img/logoBlanco.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal text-white p-10 bg-neutral">
      <aside>
        <img
          src={logoImg}
          alt="Logo Viña Los Reyes"
          className="w-24 h-24 object-contain"
        />
        <p className="font-poppins text-[13px]">
          <strong className="text-[15px]">Viña Los Reyes</strong>
          <br />
          Experiencias inolvidables desde 1896
          <br />
          Carretera Cañete Nª40 Lunahuaná
        </p>
      </aside>

      <nav>
        <h6 className="footer-title text-white font-poppins">Explora</h6>

        <a
          href="#inicio"
          className="link link-hover text-white font-poppins flex items-center gap-2"
        >
          <i className="fas fa-arrow-right text-red-500 text-xs"></i>
          Inicio
        </a>

        <a
          href="#nosotros"
          className="link link-hover text-white font-poppins flex items-center gap-2"
        >
          <i className="fas fa-arrow-right text-red-500 text-xs"></i>
          Sobre Nosotros
        </a>

        <a
          href="#reserva"
          className="link link-hover text-white font-poppins flex items-center gap-2"
        >
          <i className="fas fa-arrow-right text-red-500 text-xs"></i>
          Reservas
        </a>

        <a
          href="#galeria"
          className="link link-hover text-white font-poppins flex items-center gap-2"
        >
          <i className="fas fa-arrow-right text-red-500 text-xs"></i>
          Carta
        </a>

        <a
          href="#contacto"
          className="link link-hover text-white font-poppins flex items-center gap-2"
        >
          <i className="fas fa-arrow-right text-red-500 text-xs"></i>
          Contacto
        </a>
      </nav>

      <nav>
        <h6 className="footer-title text-white font-poppins">Contacto</h6>

        <p className="text-white font-poppins flex items-center gap-2">
          <i className="fas fa-phone-alt text-red-500 text-sm"></i>
          +51 933084277
        </p>

        <p className="text-white font-poppins flex items-center gap-2">
          <i className="fas fa-envelope text-red-500 text-sm"></i>
          vinalosreyes@gmail.com
        </p>

        <p className="text-white font-poppins flex items-center gap-2">
          <i className="fas fa-clock text-red-500 text-sm"></i>
          Lunes - Viernes, 12:00 - 22:00
        </p>
      </nav>

      <nav>
        <h6 className="footer-title text-white font-poppins">Atención</h6>
        <Link
          to="/complaints-book"
          className="bg-red-800 text-white py-2 px-6 rounded-md hover:bg-white hover:text-red-900 transition-all font-bold"
        >
          <i className="fa-solid fa-book-open mr-2"></i>
          Libro de Reclamaciones
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
