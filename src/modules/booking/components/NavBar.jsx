import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { label: "Inicio", id: "inicio" },
    { label: "Sobre Nosotros", id: "nosotros" },
    { label: "Reservas", id: "reserva" },
    { label: "Carta", id: "galeria" },
    { label: "Contacto", id: "contacto" },
  ];

  return (
    <div id="inicio" className="navbar shadow-sm bg-red-900 relative z-50">
      <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center px-4 py-2">
        <div className="navbar-start">
          <Link to="/" className="text-4xl font-rouge text-white font-semibold">
            Viña los Reyes
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <HashLink
                  smooth
                  to={`/#${link.id}`}
                  className="font-poppins font-semibold text-white text-[16px]"
                >
                  {link.label}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          <div className="hidden lg:block">
            <Modal />
          </div>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-white text-2xl"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-2/3 max-w-xs bg-red-800 text-white z-50 p-6 shadow-lg flex flex-col gap-6
        transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end">
          <button onClick={closeMenu} className="text-white text-2xl">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <nav className="flex flex-col gap-4 mt-4">
          {navLinks.map((link) => (
            <HashLink
              key={link.id}
              smooth
              to={`/#${link.id}`}
              onClick={closeMenu}
              className="text-lg font-poppins"
            >
              {link.label}
            </HashLink>
          ))}
        </nav>

        <div className="mt-auto">
          <Modal />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
