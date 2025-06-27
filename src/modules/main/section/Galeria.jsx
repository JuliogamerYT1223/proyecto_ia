import { useEffect, useState } from "react";
import { ObtenerProductos } from "../services/productService";
import Card from "../components/ui/Card";
import fondoNosotrosImg from "../../../assets/img/fondoNosotros.png"

export default function Galeria() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducto() {
      try {
        setLoading(true);
        const response = await ObtenerProductos();
        // Asegurar que productos sea un array
        const productosData = response.data;
        console.log(productosData);
        setProductos(productosData);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducto();
  }, []);

  return (
    <div
      id="galeria"
      className="min-h-screen bg-cover bg-center px-4 py-16"
      style={{
        backgroundImage: `url(${fondoNosotrosImg})`,
      }}
    >
      <h1 className="md:text-6xl text-center mb-12 text-7xl font-bold font-rouge">
        Galería de Fotos
      </h1>

      {loading ? (
        <div className="text-center">
          <p className="text-xl">Cargando productos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {Array.isArray(productos) && productos.slice(0, 8).map((item, i) => (
            <Card
              key={i}
              nombre={item.nombre}
              precio={item.precio}
              descripcion={item.descripcion}
              disponible={item.disponible}
              imagen={item.imagen}
            />
          ))}
        </div>
      )}
    </div>
  );
}
