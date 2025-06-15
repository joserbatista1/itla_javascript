export default function HoraSelector({ hora, setHora }) {
  return (
    <div className="my-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona horario:</label>
      <select
        value={hora}
        onChange={e => setHora(e.target.value)}
        className="w-full p-2 border rounded shadow-sm"
      >
        <option value="18:00-20:00">6pm - 8pm</option>
        <option value="20:00-22:00">8pm - 10pm</option>
      </select>
    </div>
  );
}