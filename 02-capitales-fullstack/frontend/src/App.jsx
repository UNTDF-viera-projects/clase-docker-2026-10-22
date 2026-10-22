import { useEffect, useState } from 'react'

export default function App() {
  const [nombre, setNombre] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  // Espera 300 ms después de la última tecla antes de consultar la API
  useEffect(() => {
    const t = setTimeout(() => {
      setBusqueda(nombre)
      setPage(1)
    }, 300)
    return () => clearTimeout(t)
  }, [nombre])

  useEffect(() => {
    const params = new URLSearchParams({ page })
    if (busqueda) params.set('nombre', busqueda)

    fetch(`/api/capitales?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error(`La API respondió ${res.status}`)
        return res.json()
      })
      .then((json) => {
        setData(json)
        setError(null)
      })
      .catch((err) => setError(err.message))
  }, [page, busqueda])

  return (
    <main>
      <h1>Capitales de Argentina</h1>

      <input
        type="search"
        placeholder="Buscar por nombre…"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Capital</th>
            <th>Provincia</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nombre}</td>
              <td>{c.provincia}</td>
            </tr>
          ))}
          {data?.total === 0 && (
            <tr>
              <td colSpan="3">Sin resultados</td>
            </tr>
          )}
        </tbody>
      </table>

      {data && data.total_pages > 0 && (
        <nav>
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
            ← Anterior
          </button>
          <span>
            Página {data.page} de {data.total_pages} ({data.total} capitales)
          </span>
          <button
            disabled={page >= data.total_pages}
            onClick={() => setPage(page + 1)}
          >
            Siguiente →
          </button>
        </nav>
      )}
    </main>
  )
}
