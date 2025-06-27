import { useState, useEffect, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker.css";
import NavBar from "../components/NavBar";
import Footer from "../section/Footer";
import TextInput from "../components/TextInput";
import { validateField, validateAllFields } from "../utils/validation";
import axios from "axios";
import es from "date-fns/locale/es";
import logoSVG from "../../../assets/logo.svg";
import PDFReceipt from "../pdf/PDFreceipt";

registerLocale("es", es);
const API_BASE_URL = import.meta.env.VITE_SOME_KEY;

const pasos = ["Fecha y hora", "Personas", "Mesa", "Datos", "Confirmación"];

const useIsLargeScreen = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsLargeScreen(window.innerWidth >= 768);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return isLargeScreen;
};

const Booking = () => {
  const isLargeScreen = useIsLargeScreen();
  const [paso, setPaso] = useState(0);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [personas, setPersonas] = useState("");
  const [mesasDisponibles, setMesasDisponibles] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const pdfRef = useRef();
  const [form, setForm] = useState({
    nombre_cliente: "",
    correo: "",
    telefono: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      const modal = document.getElementById("auth_modal");
      if (modal && typeof modal.showModal === "function") {
        modal.showModal();
      }
    }
  }, []);

  const handleVolver = () => {
    if (paso > 0) {
      setPaso((prev) => prev - 1);
    }
  };

  const buscarMesas = async () => {
    if (!personas || personas < 1 || personas > 12) {
      alert("Por favor selecciona una cantidad válida de personas (1-12).");
      return;
    }

    try {
      const fechaCompleta = new Date(fechaSeleccionada);
      fechaCompleta.setHours(horaSeleccionada);
      fechaCompleta.setMinutes(0);

      const res = await axios.get(
        `${API_BASE_URL}/api/mesas/`,
        {
          params: {
            cantidad_personas: personas,
            fecha_hora: fechaCompleta.toLocaleString("sv-SE")
          },
        }
      );

      setMesasDisponibles(res.data);
      setPaso(2);
    } catch (err) {
      alert("Error al buscar mesas disponibles");
    }
  };

  const cleanObject = (obj) =>
    Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)
    );

  const enviarReserva = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario || !usuario._id) {
      alert("Debes iniciar sesión para hacer una reserva.");
      return;
    }

    const fechaCompleta = new Date(fechaSeleccionada);
    fechaCompleta.setHours(horaSeleccionada);
    fechaCompleta.setMinutes(0);
    fechaCompleta.setSeconds(0);
    fechaCompleta.setMilliseconds(0);

    const reservaData = {
      ...form,
      cantidad_personas: personas,
      fecha_hora: fechaCompleta.toLocaleString("sv-SE"),
      mesa_id: mesaSeleccionada,
      usuario_id: usuario._id,
    };

    try {
      await axios.post(
        `${API_BASE_URL}/api/reservar/`,
        cleanObject(reservaData)
      );
      alert("✅ Reserva realizada con éxito");
      setPaso(4);
    } catch (err) {
      console.error(
        "❌ Error al hacer la reserva:",
        err.response?.data || err.message
      );
      if (err.response?.status === 409) {
        alert("⚠️ La mesa ya está reservada en ese horario.");
      } else if (err.response?.status === 422) {
        alert("⚠️ Hay campos faltantes o incorrectos.");
      } else {
        alert("❌ Error al hacer la reserva");
      }
    }
  };

  const obtenerResumenReserva = () => {
    const fecha = new Date(fechaSeleccionada);
    fecha.setHours(horaSeleccionada);
    fecha.setMinutes(0);

    return {
      Fecha: fecha.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      Hora: `${horaSeleccionada}:00`,
      Personas: personas,
      Mesa: mesasDisponibles.find((m) => m._id === mesaSeleccionada)?.nombre,
      Nombre: form.nombre_cliente,
      Correo: form.correo,
      Teléfono: form.telefono,
    };
  };

  const enviarCorreo = async () => {
    try {
      const resumen = obtenerResumenReserva();

      const data = {
        nombre: form.nombre_cliente,
        correo: form.correo,
        telefono: form.telefono,
        fecha: resumen.Fecha,
        hora: resumen.Hora,
        personas: resumen.Personas,
        mensaje: `Reserva para ${resumen.Personas} persona(s) el ${resumen.Fecha} a las ${resumen.Hora} en la mesa ${resumen.Mesa}.`,
      };

        await axios.post(`${API_BASE_URL}/`, data);

      alert("✉️ Correo enviado con éxito");
    } catch (error) {
      console.error("❌ Error al enviar el correo:", error);
      alert("❌ No se pudo enviar el correo");
    }
  };

  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto p-6 space-y-6 font-poppins">
        <ul className="steps steps-horizontal w-full">
          {pasos.map((label, index) => (
            <li
              key={label}
              className={`step ${index <= paso ? "step-neutral" : ""}`}
            >
              {label}
            </li>
          ))}
        </ul>

        {paso === 0 && (
          <>
            <h2 className="text-lg font-semibold mb-2 font-poppins">
              Selecciona fecha
            </h2>
            <DatePicker
              selected={fechaSeleccionada}
              onChange={(date) => {
                setFechaSeleccionada(date);
                setHoraSeleccionada(null);
              }}
              minDate={new Date()}
              inline
              monthsShown={isLargeScreen ? 2 : 1}
              locale="es"
              filterDate={(date) => {
                const day = date.getDay();
                return day !== 1 && day !== 2 && day !== 3;
              }}
            />

            <h2 className="text-lg font-semibold mt-6 mb-2 font-poppins">
              Selecciona hora
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {Array.from({ length: 10 }, (_, i) => i + 12).map((hora) => (
                <button
                  key={hora}
                  onClick={() => setHoraSeleccionada(hora)}
                  className={`py-2 rounded-full border text-sm cursor-pointer font-poppins font-semibold ${
                    horaSeleccionada === hora
                      ? "bg-red-900 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {hora}:00
                </button>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={() => setPaso(1)}
                disabled={!horaSeleccionada}
                className={`w-full py-2 rounded text-white font-poppins transition cursor-pointer ${
                  horaSeleccionada
                    ? "bg-red-900 hover:bg-red-800"
                    : "bg-red-900 opacity-50 cursor-not-allowed"
                }`}
              >
                Siguiente
              </button>
            </div>
          </>
        )}

        {paso === 1 && (
          <>
            <label className="block mb-2 font-medium">
              Cantidad de personas
            </label>
            <select
              className="select select-bordered w-full font-poppins"
              value={personas}
              onChange={(e) => setPersonas(Number(e.target.value))}
            >
              <option disabled value="">
                Selecciona una opción
              </option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>

            <div className="flex justify-between mt-6 gap-2">
              <button
                onClick={handleVolver}
                className="w-1/2 bg-gray-300 text-black py-2 rounded hover:bg-gray-400 cursor-pointer font-poppins"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>
                Volver
              </button>
              <button
                onClick={buscarMesas}
                className="w-1/2 bg-red-900 text-white py-2 rounded hover:bg-red-800 cursor-pointer"
              >
                Buscar mesas
              </button>
            </div>
          </>
        )}

        {paso === 2 && (
          <>
            {mesasDisponibles.length > 0 ? (
              <>
                <h3 className="text-lg mt-4 font-semibold">
                  Mesas disponibles:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {mesasDisponibles.map((mesa) => (
                    <button
                      key={mesa._id}
                      onClick={() => setMesaSeleccionada(mesa._id)}
                      className={`p-2 border rounded text-sm cursor-pointer transition ${
                        mesaSeleccionada === mesa._id
                          ? "bg-red-900 text-white"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {mesa.nombre} ({mesa.capacidad} pers.)
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-6 gap-4">
                  <button
                    onClick={() => setPaso(1)}
                    className="w-1/2 bg-gray-300 text-black py-2 rounded hover:bg-gray-400 cursor-pointer font-poppins"
                  >
                    <i className="fa-solid fa-arrow-left mr-2"></i>
                    Volver
                  </button>
                  <button
                    onClick={() => mesaSeleccionada && setPaso(3)}
                    disabled={!mesaSeleccionada}
                    className={`w-1/2 py-2 rounded font-poppins transition ${
                      mesaSeleccionada
                        ? "bg-red-900 text-white hover:bg-red-800"
                        : "bg-red-900 text-white opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Siguiente
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-10">
                <div className="bg-red-900 border text-white px-6 py-5 rounded-xl text-center shadow-sm">
                  <div className="text-4xl mb-2">🚫</div>
                  <h4 className="text-xl font-bold mb-2">
                    No hay mesas disponibles
                  </h4>
                  <p className="text-sm mb-4">
                    No encontramos mesas para la cantidad de personas
                    seleccionada, puedes intentar con otra cantidad o cambiar el
                    horario.
                  </p>
                  <button
                    onClick={() => setPaso(1)}
                    className="bg-white text-red-900 font-poppins font-semibold px-6 py-2 rounded cursor-pointer"
                  >
                    <i className="fa-solid fa-arrow-left mr-2"></i>Volver a
                    personas
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {paso === 3 && (
          <>
            <div className="space-y-4">
              {["nombre_cliente", "correo", "telefono"].map((field) => (
                <TextInput
                  key={field}
                  label={
                    field === "nombre_cliente"
                      ? "Nombre"
                      : field === "correo"
                      ? "Correo"
                      : "Teléfono"
                  }
                  name={field}
                  type={field === "correo" ? "email" : "text"}
                  value={form[field]}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setForm((prev) => ({ ...prev, [name]: value }));
                    if (touched[name]) {
                      setErrors((prev) => ({
                        ...prev,
                        [name]: validateField(name, value),
                      }));
                    }
                  }}
                  onBlur={(e) => {
                    const { name } = e.target;
                    setTouched((prev) => ({ ...prev, [name]: true }));
                    setErrors((prev) => ({
                      ...prev,
                      [name]: validateField(name, form[name]),
                    }));
                  }}
                  error={errors[field]}
                  touched={touched[field]}
                  placeholder={
                    field === "nombre_cliente"
                      ? "Juan Pérez"
                      : field === "correo"
                      ? "correo@ejemplo.com"
                      : "987654321"
                  }
                />
              ))}
            </div>

            <div className="flex justify-between mt-6 gap-2">
              <button
                onClick={handleVolver}
                className="w-1/2 bg-gray-300 text-black py-2 rounded hover:bg-gray-400 cursor-pointer font-poppins"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>
                Volver
              </button>
              <button
                onClick={() => {
                  const newErrors = validateAllFields(form);
                  setErrors(newErrors);
                  setTouched({
                    nombre_cliente: true,
                    correo: true,
                    telefono: true,
                  });

                  const hasErrors = Object.values(newErrors).some((msg) => msg);
                  if (!mesaSeleccionada || !horaSeleccionada) {
                    alert("Selecciona una mesa y hora");
                    return;
                  }
                  if (hasErrors) {
                    alert("Corrige los errores en el formulario");
                    return;
                  }
                  enviarReserva();
                }}
                className={`w-1/2 py-2 rounded font-poppins transition ${
                  Object.values(validateAllFields(form)).some((msg) => msg)
                    ? "bg-red-900 text-white opacity-50 cursor-not-allowed"
                    : "bg-red-900 text-white hover:bg-red-800"
                }`}
              >
                Confirmar Reserva
              </button>
            </div>
          </>
        )}

        {paso === 4 && (
          <div className="max-w-3xl mx-auto space-y-6 font-poppins">
            <div
              role="alert"
              className="alert bg-green-900 text-white shadow-lg text-left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>¡Tu reserva ha sido confirmada exitosamente!</span>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white border rounded-xl p-6 shadow-md">
              <div className="flex-shrink-0">
                <img
                  src={logoSVG}
                  alt="Logo empresa"
                  className="w-32 h-32 object-contain"
                />
              </div>

              <div className="text-sm w-full">
                <h3 className="text-lg font-semibold mb-3 border-b pb-1">
                  Resumen de la reserva
                </h3>
                <ul className="space-y-1">
                  {Object.entries(obtenerResumenReserva()).map(
                    ([clave, valor]) => (
                      <li key={clave}>
                        <strong className="capitalize">{clave}:</strong> {valor}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <button
                onClick={() => pdfRef.current?.generarPDF()}
                className="w-full text-center bg-red-900 hover:bg-red-800 text-white py-3 px-4 rounded-xl transition font-semibold cursor-pointer font-poppins"
              >
                <i className="fa-solid fa-file-pdf mr-2"></i> Descargar PDF
              </button>

              <button
                onClick={enviarCorreo}
                className="w-full text-center bg-red-900 hover:bg-red-800 text-white py-3 px-4 rounded-xl transition font-semibold cursor-pointer font-poppins"
              >
                <i className="fa-solid fa-envelope mr-2"></i> Enviar al correo
              </button>

              <a
                href="/"
                className="w-full text-center bg-red-900 hover:bg-red-800 text-white py-3 px-4 rounded-xl transition font-semibold cursor-pointer font-poppins"
              >
                <i className="fa-solid fa-house mr-2"></i> Volver al inicio
              </a>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <PDFReceipt ref={pdfRef} obtenerResumenReserva={obtenerResumenReserva} />
    </>
  );
};

export default Booking;
