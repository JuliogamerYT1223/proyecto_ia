import NavBar from "../components/layout/NavBar";
import Hero from "../section/Hero";
import SobreNosotros from "../section/SobreNosotros";
import Reserva from "../section/Reserva";
import Galeria from "../section/Galeria";
import Formulario from "../section/Formulario";
import Footer from "../section/Footer";
import ChatBotComponent from "../../chatbot/ChatBotComponent";

function Main() {
  return (
    <>
      <NavBar />
      <Hero />
      <SobreNosotros />
      <Reserva />
      <Galeria />
      <Formulario />
      <Footer />
      <ChatBotComponent />
    </>
  );
}

export default Main;
