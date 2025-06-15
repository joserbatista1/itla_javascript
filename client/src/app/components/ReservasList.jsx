export default function ReservasList({ reservas, restaurante, hora }) {
  return (
    <div id="reservas" className="my-6">
      <h2 className="text-xl font-semibold mb-2">
        Reservas en {restaurante} a las {hora}
      </h2>
      <ul className="bg-white p-4 rounded shadow space-y-2">
        {reservas.length === 0 && <li>No hay reservas</li>}
        {reservas.map(r => (
          <li key={r.id} className="border-b py-1">{r.nombre} - {r.cantidad} personas</li>
        ))}
      </ul>
    </div>
  );
} 