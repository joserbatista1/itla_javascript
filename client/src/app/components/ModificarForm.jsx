import { useState, useEffect } from "react";

export default function FormularioModificar({ reserva, onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (reserva) {
      setNombre(reserva.nombre);
      setCantidad(reserva.cantidad);
    }
  }, [reserva]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({ ...reserva, nombre, cantidad });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <h3 className="text-lg font-semibold">Modificar Reserva</h3>

      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Cantidad de personas</label>
        <input
          type="number"
          value={cantidad}
          min="1"
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="mt-1 w-full border rounded p-2"
          required
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
