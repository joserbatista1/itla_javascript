export default function ReservasList({ reservas, restaurante, hora,handleEliminar,handleModificar}) {

  console.log(reservas);
  return (
    <div id="reservas" className="my-6">
      <h2 className="text-xl font-semibold mb-2 ">
        Reservas en {restaurante} a las {hora}
      </h2>
  <ul className="bg-white p-4 rounded shadow scroll-mt-20 space-y-2">
  {reservas.length === 0 && (
    <li className="text-gray-500 italic">No hay reservas</li>
  )}

  {reservas.map((r) => (
    <li
      key={r.id}
      
      className="border-b py-1 flex justify-between items-center"
    >
      <span>{r.nombre} - {r.cantidad} personas - fecha {r.fecha}</span>
     <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => handleEliminar(r.id)}
                className="text-sm px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-400 transition"
              >
                Eliminar
              </button>
              <button
                type="button"
                onClick={() => handleModificar(r.id)}
                className="text-sm px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-400 transition"
              >
                Modificar
              </button>
            </div>
    </li>
  ))}
</ul>


    </div>
  );
} 