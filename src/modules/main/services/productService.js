import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_SOME_KEY;

const ednPointProduc = `${API_BASE_URL}/api/product`;
const endPointEmail = `${API_BASE_URL}/send-email`;

export const ObtenerProductos = async () => await axios.get(ednPointProduc);

export const EnviarCorreo = (datos) => axios.post(endPointEmail, datos);
