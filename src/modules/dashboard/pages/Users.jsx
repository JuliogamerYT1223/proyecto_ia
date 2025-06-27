import { useState } from "react";

export default function Users() {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Carlos Reyes",
      correo: "admin@vinas.com",
      telefono: "987654321",
      rol: "ADMIN",
    },
    {
      id: 2,
      nombre: "Laura Torres",
      correo: "laura@gmail.com",
      telefono: "912345678",
      rol: "CLIENTE",
    },
  ]);

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    password: "",
    rol: "CLIENTE",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsuarios([...usuarios, { ...form, id: Date.now() }]);
    setForm({ nombre: "", correo: "", telefono: "", password: "", rol: "CLIENTE" });
  };

  const handleDelete = (id) => {
    setUsuarios(usuarios.filter((u) => u.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-red-900">Agregar Usuario</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAddUser}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="input input-bordered"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          className="input input-bordered"
          value={form.correo}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          className="input input-bordered"
          value={form.telefono}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="input input-bordered"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select
          name="rol"
          className="select select-bordered"
          value={form.rol}
          onChange={handleChange}
        >
          <option value="CLIENTE">Cliente</option>
          <option value="ADMIN">Administrador</option>
        </select>

        <button className="btn bg-red-900 text-white hover:bg-red-800 md:col-span-2">
          Crear Usuario
        </button>
      </form>

      <hr />

      <h2 className="text-xl font-bold text-red-900">Lista de Usuarios</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.rol}</td>
                <td>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleDelete(usuario.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
