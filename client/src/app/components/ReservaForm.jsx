export default function ReservaForm({ form, setForm, restaurantes, handleSubmit }) {
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  const horarios = restaurantes.find(r => r.nombre === form.restaurante)?.horarios || [];

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded space-y-3">
      <h2 className="text-xl font-semibold">Nueva Reserva</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min={1}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Restaurante</label>
        <select
          name="restaurante"
          value={form.restaurante}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {restaurantes.map(r => (
            <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Hora</label>
        <select
          name="hora"
          value={form.hora}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {horarios.map(h => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </div>

    <button
     type="submit"
     className="block mx-auto bg-white text-black px-4 py-2 rounded hover:bg-gray-700 hover:text-white max-w-2xl"
      >
      Reservar
    </button>

    </form>
  );
}