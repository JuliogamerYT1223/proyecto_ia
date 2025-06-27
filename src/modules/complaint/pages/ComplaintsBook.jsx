import { Link } from "react-router-dom";
import logoSVG from "../../../assets/logo.svg";
import { useComplaintForm } from "../hooks/useComplaintForm";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import TextareaInput from "../components/TextareaInput";
import FileInput from "../components/FileInput";
import FormMessage from "../components/FormMessage";
import SubmitButton from "../components/SubmitButton";

function ComplaintsBook() {
  const {
    formData,
    errors,
    touched,
    loading,
    showMessage,
    isSuccess,
    submissionMessage,
    fileInputRef,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormValid,
  } = useComplaintForm();

  return (
    <div className="relative min-h-screen bg-white text-gray-800 pb-8 px-4 font-poppins">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
        <Link to="/">
          <img
            src={logoSVG}
            alt="Logo Viña Los Reyes"
            className="w-30 h-30 object-contain"
          />
        </Link>
        <Link
          to="/"
          className="text-sm bg-red-900 text-white px-4 py-2 rounded hover:bg-red-800 transition font-poppins"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Volver
        </Link>
      </div>

      <hr className="border-gray-300 max-w-5xl mx-auto mb-6" />

      <div className="max-w-3xl mx-auto px-4 mb-8 text-center sm:text-left">
        <p className="text-sm text-gray-500 mb-1">
          <i className="fa-solid fa-arrow-right mr-2"></i>
          Enviar Reclamo
        </p>
        <h2 className="text-2xl font-bold mb-1">Formulario de Reclamos</h2>
        <p className="text-sm text-gray-600">
          Por favor, ingresa un correo electrónico válido para que podamos
          contactarte.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto space-y-5 px-4"
      >
        <FormMessage
          show={showMessage}
          success={isSuccess}
          message={submissionMessage}
        />

        <TextInput
          {...propsFor(
            "email",
            formData,
            errors,
            touched,
            handleChange,
            handleBlur
          )}
          label="Correo electrónico"
          type="email"
          placeholder="correo@ejemplo.com"
        />

        <SelectInput
          label="Tipo de servicio o producto"
          name="servicio"
          value={formData.servicio}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.servicio}
          touched={touched.servicio}
          options={["Tour", "Restaurante", "Reserva online", "Otro"]}
        />

        <TextInput
          {...propsFor(
            "nombres",
            formData,
            errors,
            touched,
            handleChange,
            handleBlur
          )}
          label="Apellidos y Nombres"
          placeholder="Juan Pérez"
        />
        <TextInput
          {...propsFor(
            "dni",
            formData,
            errors,
            touched,
            handleChange,
            handleBlur
          )}
          label="Número de DNI"
          type="tel"
          placeholder="12345678"
        />
        <TextInput
          {...propsFor(
            "celular",
            formData,
            errors,
            touched,
            handleChange,
            handleBlur
          )}
          label="Número de celular de contacto"
          type="tel"
          placeholder="987654321"
        />
        <TextInput
          {...propsFor(
            "asunto",
            formData,
            errors,
            touched,
            handleChange,
            handleBlur
          )}
          label="Asunto"
          placeholder="Motivo del reclamo"
        />

        <TextareaInput
          label="Descripción"
          name="descripcion"
          placeholder="Describe el reclamo..."
          value={formData.descripcion}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.descripcion}
          touched={touched.descripcion}
        />

        <FileInput
          name="archivo"
          onChange={handleChange}
          refProp={fileInputRef}
        />

        <SubmitButton disabled={!isFormValid() || loading} loading={loading} />
      </form>
    </div>
  );
}

function propsFor(name, formData, errors, touched, onChange, onBlur) {
  return {
    name,
    value: formData[name],
    onChange,
    onBlur,
    error: errors[name],
    touched: touched[name],
  };
}

export default ComplaintsBook;
