import { useState } from "react";
import TextInput from "../components/ui/TextInput";
import TextareaInput from "../components/ui/TextareaInput";
import FormMessage from "../components/ui/FormMessage";
import SubmitButton from "../components/ui/SubmitButton";
import reservaImg from "../../../assets/img/reservas.png";
import { EnviarCorreo } from "../services/productService";
import { validateField, validateAllFields } from "../utils/validateForm";

function Formulario() {
  const [formData, setFormData] = useState({
    nombre: "",
    celular: "",
    correo: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({
    show: false,
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateAllFields(formData);
    const hasErrors = Object.values(validationErrors).some((msg) => msg);
    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await EnviarCorreo(formData);
      setFormStatus({
        show: true,
        success: true,
        message: "Tu mensaje fue enviado correctamente.",
      });
      setFormData({ nombre: "", celular: "", correo: "", descripcion: "" });
      setErrors({});
    } catch (error) {
      console.error(error);
      setFormStatus({
        show: true,
        success: false,
        message: "Error al enviar el mensaje.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setFormStatus({ show: false, success: false, message: "" });
      }, 5000);
    }
  };

  return (
    <div
      id="contacto"
      className="hero min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${reservaImg})` }}
    >
      <div className="hero-content flex flex-col items-center w-full px-4">
        <h2 className="text-6xl font-bold mt-8 text-white text-center font-rouge mb-8">
          Contáctanos
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-2xl space-y-6 mb-10"
        >
          <FormMessage
            show={formStatus.show}
            success={formStatus.success}
            message={formStatus.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Nombre"
              name="nombre"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={handleChange}
              error={errors.nombre}
              touched={true}
            />
            <TextInput
              label="Teléfono"
              name="celular"
              placeholder="Tu teléfono"
              type="tel"
              value={formData.celular}
              onChange={handleChange}
              error={errors.celular}
              touched={true}
            />
          </div>

          <TextInput
            label="Correo electrónico"
            name="correo"
            placeholder="Tu correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            error={errors.correo}
            touched={true}
          />

          <TextareaInput
            label="Mensaje"
            name="descripcion"
            placeholder="Escribe tu mensaje aquí..."
            value={formData.descripcion}
            onChange={handleChange}
            error={errors.descripcion}
            touched={true}
          />

          <div className="flex justify-end">
            <SubmitButton disabled={loading} loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Formulario;
