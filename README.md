# Clase introductoria a Docker — UNTDF

Material de la clase: presentación y ejemplos.

| Carpeta | Contenido |
| --- | --- |
| [`slides/`](slides/) | Presentación: abrir `slides/index.html` en el navegador (funciona offline). `S` = notas del orador, `?print-pdf` = exportar a PDF |
| [`01-capitales-simple/`](01-capitales-simple/) | React + Vite con datos hardcodeados: primer Dockerfile, capas, multi-stage |
| [`02-capitales-fullstack/`](02-capitales-fullstack/) | PostgreSQL + FastAPI (uv) + React (pnpm): redes, volúmenes, Compose dev y prod |
| [`docs/render.md`](docs/render.md) · [`render.yaml`](render.yaml) | Deploy en Render |
| [`storyboard.md`](storyboard.md) | Guion de la presentación |

Requisitos: Docker Desktop (u OrbStack/Podman Desktop) con Compose v2. Para correr sin Docker: Node 24 +
pnpm, y Python + uv.

## Editar la presentación

Las slides se editan en `slides/index.src.html` (y el estilo en `slides/untdf.css`). Los bloques de código
marcados con `data-incluir` se completan con el contenido real de los archivos de ejemplo:

```bash
python3 slides/build.py   # regenera slides/index.html
```

Así, si cambiás un Dockerfile o un compose, la slide se actualiza sola al regenerar.
