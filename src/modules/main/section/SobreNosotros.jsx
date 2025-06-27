import { Link } from "react-router-dom";
import pizzaNosotrosImg from "../../../assets/img/pizzaNosotros.png";
import fondoNosotrosImg from "../../../assets/img/fondoNosotros.png";

function SobreNosotros() {
  return (
    <div
      id="nosotros"
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${fondoNosotrosImg})`,
      }}
    >
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto overflow-hidden">
        <div className="md:w-1/2 flex items-center justify-center p-8">
          <img src={pizzaNosotrosImg} alt="Pizza Nosotros" />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center items-start p-8">
          <h2 className="text-7xl font-bold mb-4 font-rouge">Sobre Nosotros</h2>
          <p className="mb-6 text-[18px] font-poppins leading-relaxed">
            En Viña de los Reyes nos esforzamos por servirte las mejores pizzas
            con el toque artesanal. Deleita una buena copa de vino acompañado de
            deliciosas pastas y frescas ensaladas. Utilizamos ingredientes
            frescos y de primera calidad. Todas nuestras pizzas son elaboradas
            en horno de leña rústico brindándole un sabor inigualable.
            <br />
            ¿Quieres que te llevemos tu pizza a la puerta de tu casa? ¡Contamos
            con servicio a domicilio!
          </p>
          <a href="./src/modules/main/pdf/carta.pdf" download>
            <button className="btn bg-red-900 text-white text-lg border-none hover:bg-red-800 transition-all px-10 py-6 shadow-none">
              Ver Carta
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SobreNosotros;
