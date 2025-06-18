"use client";
import FormularioModificar from "./components/ModificarForm";
import { useState, useEffect } from "react";
import HoraSelector from "./components/HoraSelector";
import DisponibilidadList from "./components/DisponibilidadList";
import ReservaForm from "./components/ReservaForm";
import ReservasList from "./components/ReservasList";

export default function HomePage() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [hora, setHora] = useState("18:00-20:00");
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [form, setForm] = useState({ nombre: "", cantidad: 1, restaurante: "", hora });
  const [reservas, setReservas] = useState([]);
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, '0');
  const dd = String(hoy.getDate()).padStart(2, '0');
  const fechaActual = `${yyyy}-${mm}-${dd}`;

useEffect(() => {
  setRestaurantes([
    { nombre: "Ember", horarios: ["18:00-20:00", "20:00-22:00"] },
    { nombre: "Zao", horarios: ["18:00-20:00", "20:00-22:00"] },
    { nombre: "Grappa", horarios: ["18:00-20:00", "20:00-22:00"] },
    { nombre: "Larimar", horarios: ["18:00-20:00", "20:00-22:00"] },
  ]);

  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, '0');
  const dd = String(hoy.getDate()).padStart(2, '0');
  const fechaActual = `${yyyy}-${mm}-${dd}`;

  setForm(f => ({ ...f, restaurante: "Ember", hora, fecha: fechaActual }));
}, []);


  useEffect(() => {
    fetch(`https://server-production-2e7c.up.railway.app/api/reservas?hora=${hora}`)
      .then(res => res.json())
      .then(setDisponibilidad);
  }, [hora]);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("https://server-production-2e7c.up.railway.app/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Reserva realizada");
      setForm(f => ({ ...f, nombre: "", cantidad: 1 }));
      const dispo = await fetch(`https://server-production-2e7c.up.railway.app/api/reservas?hora=${hora}`).then(r => r.json());
      setDisponibilidad(dispo);
    } else {
      const err = await res.json();
      alert("Error: " + err.mensaje);
    }
  };

  const verReservas = async restaurante => {
    const res = await fetch(`https://server-production-2e7c.up.railway.app/api/reservas/${restaurante}/${hora}`);
    const data = await res.json();
    setForm(f => ({ ...f, restaurante }));
    setReservas(data);

    const element = document.getElementById('reservas');
      if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    }

  };
  const handleEliminar = async (id) => {
  try {
    const res = await fetch(`https://server-production-2e7c.up.railway.app/api/reservas/eliminar/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setReservas((prev) => prev.filter((r) => r.id !== id));
      const dispo = await fetch(`https://server-production-2e7c.up.railway.app/api/reservas?hora=${hora}`).then(r => r.json());
      setDisponibilidad(dispo);
    } else {
      console.error(`Error al eliminar la reserva ${res.status}`);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};
const [reservaEditando, setReservaEditando] = useState(null);

const handleModificar = (id) => {
  const reserva = reservas.find((r) => r.id === id);
  setReservaEditando(reserva);
};

const guardarCambios = async (reservaActualizada) => {
  try {
    const res = await fetch(`https://server-production-2e7c.up.railway.app/api/reservas/modificar/${reservaActualizada.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservaActualizada),
    });

    if (res.ok) {
      const actualizadas = reservas.map((r) =>
        r.id === reservaActualizada.id ? reservaActualizada : r
      );
      setReservas(actualizadas);
      setReservaEditando(null);
    } else {
      alert("Error al guardar cambios");
    }
  } catch (err) {
    console.error("Error de red:", err);
  }
};

const cancelarEdicion = () => {
  setReservaEditando(null);
};


  return (
    <div className="space-y-6">
      <HoraSelector hora={hora} setHora={setHora} />
      <DisponibilidadList disponibilidad={disponibilidad} onVerReservas={verReservas} />
      <ReservaForm form={form} setForm={setForm} restaurantes={restaurantes} handleSubmit={handleSubmit} />
      <ReservasList reservas={reservas} restaurante={form.restaurante} hora={hora} fecha={fechaActual} handleEliminar={handleEliminar} handleModificar={handleModificar} />
      {reservaEditando && (
      <FormularioModificar
      reserva={reservaEditando}
      onGuardar={guardarCambios}
      onCancelar={cancelarEdicion}
  />
)}

    </div>
  );
}
