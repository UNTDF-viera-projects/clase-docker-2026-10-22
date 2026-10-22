import { capitales } from './capitales.js'

export default function App() {
  return (
    <main>
      <h1>Capitales de Argentina</h1>
      {/* Probá cambiar este texto y reconstruir la imagen */}
      <p>Versión 1</p>
      <ul>
        {capitales.map((c) => (
          <li key={c.provincia}>
            <strong>{c.nombre}</strong> — {c.provincia}
          </li>
        ))}
      </ul>
    </main>
  )
}
