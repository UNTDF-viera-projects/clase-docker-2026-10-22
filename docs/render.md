# Deploy en Render

Render construye la imagen a partir del `Dockerfile` cada vez que hacés `git push`, la ejecuta y te da
una URL pública `https://<nombre>.onrender.com`.

Plan free: el servicio se duerme tras ~15 minutos sin tráfico y la primera visita tarda en despertar
(cold start). La base de datos free vence a los 30 días.

## En vivo: ejemplo 1 desde el dashboard

1. Subir el repo a GitHub.
2. Render → **New** → **Web Service** → conectar el repositorio.
3. **Language / Runtime**: `Docker`.
4. **Root Directory**: `01-capitales-simple` (ahí está el `Dockerfile`).
5. **Instance Type**: `Free`.
6. **Environment Variables**: `PORT` = `80`. nginx escucha en el 80 y Render, por defecto, espera el 10000.
7. **Deploy Web Service** y mirar los logs del build: son los mismos pasos de `docker build`.
8. Cambiar algo en `src/App.jsx`, `git push` y ver cómo Render redeploya solo.

## Bonus: todo el fullstack con Blueprint

El archivo [`render.yaml`](../render.yaml) en la raíz describe la base, la API y los dos frontends.

1. Render → **New** → **Blueprint** → elegir el repo.
2. Cuando pida `API_URL` para `capitales-web`, poner `https://capitales-api.onrender.com`. Si ese
   nombre ya estaba tomado, Render agrega un sufijo: después corregí la variable en
   *capitales-web → Environment* con la URL real de la API y redeployá.
3. Cargar los datos una sola vez. En *capitales-db → Connect* copiar la **External Database URL** y:

   ```bash
   psql "<External Database URL>" -f 02-capitales-fullstack/db/init.sql
   ```

   (o sin instalar psql: `docker run --rm -i postgres:18-alpine psql "<URL>" < 02-capitales-fullstack/db/init.sql`)

4. Abrir `https://capitales-web.onrender.com`.

Por qué el frontend usa la URL **pública** de la API: en el plan free, los servicios no pueden recibir
tráfico por la red privada de Render.
