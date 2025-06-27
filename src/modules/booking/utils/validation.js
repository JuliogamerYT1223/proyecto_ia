export function validateField(name, value) {
  switch (name) {
    case "correo":
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? "Ingresa un correo válido"
        : "";

    case "nombre":
    case "nombre_cliente":
      return !/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,50}$/.test(value.trim())
        ? "Solo letras. De 3 a 50 caracteres."
        : "";

    case "celular":
      return !/^9\d{8}$/.test(value)
        ? "Debe comenzar con 9 y tener 9 dígitos"
        : "";

    case "telefono":
      return !/^\d{9}$/.test(value)
        ? "El teléfono debe tener exactamente 9 dígitos."
        : "";

    case "descripcion":
      return !value.trim() ? "Este campo es obligatorio" : "";

    case "password":
      return value.length < 8
        ? "La contraseña debe tener al menos 8 caracteres."
        : "";

    default:
      return "";
  }
}

export function validateAllFields(formData) {
  const errors = {};
  for (const key in formData) {
    const error = validateField(key, formData[key]);
    if (error) errors[key] = error;
  }
  return errors;
}
