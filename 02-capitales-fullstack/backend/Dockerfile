# ---------- Base: Python + uv + dependencias ----------
FROM python:3.14-slim AS base

# Traemos el binario de uv desde su imagen oficial (otro uso de multi-stage)
COPY --from=ghcr.io/astral-sh/uv:0.13 /uv /bin/uv

WORKDIR /app

# Primero los manifiestos, para aprovechar la cache de capas
COPY pyproject.toml uv.lock ./
RUN uv sync --locked --no-install-project

# El virtualenv que creó uv queda primero en el PATH
ENV PATH="/app/.venv/bin:$PATH"

COPY app ./app

# ---------- Dev: recarga automática al cambiar el código ----------
FROM base AS dev
EXPOSE 8000
# --host 0.0.0.0: escuchar fuera del contenedor (por defecto es 127.0.0.1)
CMD ["fastapi", "dev", "app/main.py", "--host", "0.0.0.0", "--port", "8000"]

# ---------- Runtime: producción (target por defecto, es el último) ----------
FROM base AS runtime
EXPOSE 8000
# Forma shell para poder usar $PORT (Render la define); si no existe, 8000
CMD fastapi run app/main.py --host 0.0.0.0 --port ${PORT:-8000}
