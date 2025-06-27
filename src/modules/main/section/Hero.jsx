import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import heroImg from "../../../assets/img/hero.png";

function Hero() {
  const navigate = useNavigate();
  
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
      <div className="hero-overlay bg-black/70"></div>

      <div className="hero-content text-white text-center flex justify-center items-center">
        <div className="max-w-md">
          <Heading title="Disfruta de los mejores" subtitle="Vinos y Pizzas" />

          <div className="flex justify-center gap-4">
            <Link to="/booking">
              <Button>Reservar</Button>
            </Link>

            <a href="./src/modules/main/pdf/carta.pdf" download>
              <Button>Ver Carta</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
