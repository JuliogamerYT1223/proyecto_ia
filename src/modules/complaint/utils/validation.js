export function validateField(name, value) {
  switch (name) {
    case "email":
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? "Ingresa un correo válido"
        : "";
    case "servicio":
      return !value ? "Este campo es obligatorio" : "";
    case "nombres":
      return !/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,50}$/.test(value)
        ? "Solo letras. De 3 a 50 caracteres."
        : "";
    case "dni":
      return !/^\d{8}$/.test(value) ? "Debe tener exactamente 8 dígitos" : "";
    case "celular":
      return !/^9\d{8}$/.test(value)
        ? "Debe comenzar con 9 y tener 9 dígitos"
        : "";
    case "asunto":
    case "descripcion":
      return !value.trim() ? "Este campo es obligatorio" : "";
    default:
      return "";
  }
}

export function validateAllFields() {
  const errors = {};
  Object.keys().forEach((field) => {
    errors[field] = validateField(field);
  });
}
