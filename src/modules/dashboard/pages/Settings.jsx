import React from "react";

export default function Settings() {
  return (
    <div className="p-6 space-y-10">
      {/* Encabezado */}
      <h2 className="text-2xl font-semibold text-red-900">Configuración</h2>

      {/* Sección: Datos del restaurante */}
      <section className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4">Datos del restaurante</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Nombre del restaurante</span>
            </label>
            <input type="text" placeholder="Viñas Los Reyes" className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Teléfono</span>
            </label>
            <input type="text" placeholder="999999999" className="input input-bordered w-full" />
          </div>

          <div className="md:col-span-2">
            <label className="label">
              <span className="label-text">Dirección</span>
            </label>
            <input type="text" placeholder="Calle Falsa 123, Ciudad" className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Horario de atención</span>
            </label>
            <input type="text" placeholder="Lun - Dom, 9am - 11pm" className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Logo</span>
            </label>
            <input type="file" className="file-input w-full" />
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button type="submit" className="btn btn-primary bg-red-900 hover:bg-red-800 text-white">
              Guardar cambios
            </button>
          </div>
        </form>
      </section>

      {/* Sección: Cambiar contraseña */}
      <section className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4">Cambiar contraseña</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Contraseña actual</span>
            </label>
            <input type="password" className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Nueva contraseña</span>
            </label>
            <input type="password" className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Confirmar nueva contraseña</span>
            </label>
            <input type="password" className="input input-bordered w-full" />
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button type="submit" className="btn btn-primary bg-red-900 hover:bg-red-800 text-white">
              Cambiar contraseña
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
