export default function DisponibilidadList({ disponibilidad, onVerReservas }) {
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-2">Disponibilidad por restaurante</h2>
      <ul className="space-y-2">
        {disponibilidad.map(d => (
          <li key={d.restaurante} className="flex justify-between items-center p-3 bg-gray-100 rounded shadow">
            <span>{d.restaurante}: {d.disponibles} espacios</span>
            <button
              className="bg-purple-900 text-white px-3 py-1 rounded hover:bg-purple-950"
              onClick={() => onVerReservas(d.restaurante)}
            >
              Ver reservas
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}