// app/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-purple-950 bottom mt-8 text-center text-lg text-white-500  items-center h-15">
      &copy; {new Date().getFullYear()} Hotel. Todos los derechos reservados.
    </footer>
  )
}
