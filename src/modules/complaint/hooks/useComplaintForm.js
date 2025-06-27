import { useState, useRef, useEffect } from "react";
import { validateField, validateAllFields } from "../utils/validation";

const initialState = {
  email: "",
  servicio: "",
  nombres: "",
  dni: "",
  celular: "",
  asunto: "",
  descripcion: "",
  archivo: null,
};

const API_BASE_URL = import.meta.env.VITE_SOME_KEY;

export function useComplaintForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = name === "archivo" ? files[0] : value;

    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
    if (touched[name]) {
      const error = validateField(name, fieldValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    const requiredFields = Object.keys(initialState).filter(
      (k) => k !== "archivo"
    );
    const allFilled = requiredFields.every((f) => formData[f] && !errors[f]);
    const noErrors = Object.values(errors).every((msg) => msg === "");
    return allFilled && noErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = validateAllFields(formData);
    setErrors(newErrors);

    if (Object.values(newErrors).some((msg) => msg)) {
      setLoading(false);
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key === "email" ? "correo" : key, value);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        setSubmissionMessage("Reclamo enviado correctamente.");
        setIsSuccess(true);
        setFormData(initialState);
        setErrors({});
        setTouched({});
        if (fileInputRef.current) fileInputRef.current.value = null;
      } else {
        const errorData = await response.json();
        setSubmissionMessage(
          "Error al enviar: " + (errorData?.detail || "desconocido")
        );
        setIsSuccess(false);
      }
    } catch (error) {
      setSubmissionMessage("Error de conexión: " + error.message);
      setIsSuccess(false);
    } finally {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      setLoading(false);
    }
  };

  return {
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
  };
}
