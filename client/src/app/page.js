"use client";

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

  useEffect(() => {
    setRestaurantes([
      { nombre: "Ember", horarios: ["18:00-20:00", "20:00-22:00"] },
      { nombre: "Zao", horarios: ["18:00-20:00", "20:00-22:00"] },
      { nombre: "Grappa", horarios: ["18:00-20:00", "20:00-22:00"] },
      { nombre: "Larimar", horarios: ["18:00-20:00", "20:00-22:00"] },
    ]);
    setForm(f => ({ ...f, restaurante: "Ember", hora }));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/api/reservas?hora=${hora}`)
      .then(res => res.json())
      .then(setDisponibilidad);
  }, [hora]);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Reserva realizada");
      setForm(f => ({ ...f, nombre: "", cantidad: 1 }));
      const dispo = await fetch(`http://localhost:3001/api/reservas?hora=${hora}`).then(r => r.json());
      setDisponibilidad(dispo);
    } else {
      const err = await res.json();
      alert("Error: " + err.mensaje);
    }
  };

  const verReservas = async restaurante => {
    const res = await fetch(`http://localhost:3001/api/reservas/${restaurante}/${hora}`);
    const data = await res.json();
    setForm(f => ({ ...f, restaurante }));
    setReservas(data);
  };

  return (
    <div className="space-y-6">
      <HoraSelector hora={hora} setHora={setHora} />
      <DisponibilidadList disponibilidad={disponibilidad} onVerReservas={verReservas} />
      <ReservaForm form={form} setForm={setForm} restaurantes={restaurantes} handleSubmit={handleSubmit} />
      <ReservasList reservas={reservas} restaurante={form.restaurante} hora={hora} />
    </div>
  );
}
