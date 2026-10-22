import math
import os

import psycopg
from fastapi import FastAPI, Query
from psycopg.rows import dict_row

# La URL de conexión llega por variable de entorno: así la misma imagen sirve
# para dev, prod o Render. El valor por defecto apunta a un Postgres local.
DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql://capitales:capitales@localhost:5432/capitales"
)
PAGE_SIZE = 5

app = FastAPI(title="Capitales de Argentina")


def get_connection():
    return psycopg.connect(DATABASE_URL, row_factory=dict_row)


@app.get("/health")
def health():
    # Lo usa el healthcheck de Docker: falla si la base no responde
    with get_connection() as conn:
        conn.execute("SELECT 1")
    return {"status": "ok"}


@app.get("/capitales")
def listar_capitales(
    page: int = Query(1, ge=1, description="Número de página (5 por página)"),
    nombre: str | None = Query(None, description="Filtra por nombre de la capital"),
):
    where = ""
    params: dict = {}
    if nombre:
        where = "WHERE unaccent(nombre) ILIKE unaccent(%(patron)s)"
        params["patron"] = f"%{nombre}%"

    with get_connection() as conn:
        total = conn.execute(
            f"SELECT count(*) AS total FROM capitales {where}", params
        ).fetchone()["total"]
        items = conn.execute(
            f"SELECT id, nombre, provincia FROM capitales {where} "
            "ORDER BY unaccent(nombre) LIMIT %(limit)s OFFSET %(offset)s",
            {**params, "limit": PAGE_SIZE, "offset": (page - 1) * PAGE_SIZE},
        ).fetchall()

    return {
        "items": items,
        "page": page,
        "page_size": PAGE_SIZE,
        "total": total,
        "total_pages": math.ceil(total / PAGE_SIZE),
    }
