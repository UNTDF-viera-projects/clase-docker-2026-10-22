# 02 · Capitales fullstack

```
navegador ──► web (React/Vite · nginx) ──/api──► api (FastAPI) ──► db (PostgreSQL)
```

- `db/init.sql` — tabla `capitales` con 24 filas (23 provincias + CABA).
- `backend/` — FastAPI + uv. `GET /capitales?page=1&nombre=san` → 5 por página, búsqueda sin acentos.
- `frontend/` — React + Vite + pnpm. Tabla paginada con input de búsqueda (filtra vía API).

## 1. Sin Docker (pnpm + uv)

Necesitás un PostgreSQL corriendo en `localhost:5432` con usuario, contraseña y base `capitales`
y haber ejecutado `db/init.sql`.

```bash
# backend
cd backend
uv sync
uv run fastapi dev app/main.py          # http://localhost:8000/docs

# frontend (otra terminal)
cd frontend
pnpm install
pnpm dev                                # http://localhost:5173 (reenvía /api a :8000)
```

## 2. Con Docker, contenedor por contenedor

Así se arma todo "a mano" antes de conocer Compose. En Windows PowerShell usá `${PWD}` en lugar de `$(pwd)`.

```bash
# red y volumen
docker network create capitales-net
docker volume create pgdata

# base de datos
docker run -d --name db --network capitales-net \
  -e POSTGRES_USER=capitales -e POSTGRES_PASSWORD=capitales -e POSTGRES_DB=capitales \
  -v pgdata:/var/lib/postgresql \
  -v "$(pwd)"/db/init.sql:/docker-entrypoint-initdb.d/init.sql:ro \
  postgres:18-alpine
docker exec -it db psql -U capitales -c "SELECT * FROM capitales LIMIT 5;"

# backend
docker build -t capitales-api ./backend
docker run -d --name api --network capitales-net -p 8000:8000 \
  -e DATABASE_URL=postgresql://capitales:capitales@db:5432/capitales \
  capitales-api
curl "localhost:8000/capitales?page=2"

# frontend (nginx reenvía /api a http://api:8000)
docker build -t capitales-web ./frontend
docker run -d --name web --network capitales-net -p 8080:80 capitales-web
# http://localhost:8080

# inspeccionar
docker network inspect capitales-net
docker logs -f api

# limpiar todo
docker rm -f web api db
docker network rm capitales-net
docker volume rm pgdata
```

## 3. Docker Compose

```bash
# desarrollo: código montado, recarga automática, todos los puertos expuestos
docker compose -f compose.dev.yaml up --build
#   web  http://localhost:5173   api  http://localhost:8000/docs   db  localhost:5432
docker compose -f compose.dev.yaml down        # -v para borrar también los datos

# producción: imágenes inmutables, healthchecks, solo nginx expuesto
cp .env.example .env                           # y cambiá la contraseña
docker compose -f compose.prod.yaml up --build -d
#   http://localhost:8080
docker compose -f compose.prod.yaml ps
docker compose -f compose.prod.yaml down
```

## 4. Render

Ver [`../docs/render.md`](../docs/render.md) y `render.yaml` en la raíz del repo.
