# Storyboard — Clase introductoria a Docker (UNTDF)

Docente: Leonel Viera · Audiencia: Analista Universitario de Sistemas / Lic. en Sistemas
Duración: **2 horas** · ~40 slides · comentarios del código de ejemplo en español

## Formato elegido: HTML con reveal.js (vendorizado, funciona offline)

Por qué HTML y no PPTX:

- **Resaltado de código paso a paso** (`data-line-numbers="1|2-3|5"`): cada clic ilumina
  una parte del Dockerfile o del compose. Es justo lo que pediste ("ir señalando las partes").
- El código de las slides es **el mismo texto** que está en las carpetas de ejemplo (copiar/pegar sin
  sorpresas de comillas tipográficas de PowerPoint).
- Se versiona en git junto a los ejemplos, y se exporta a PDF con `?print-pdf` para subir al aula virtual.
- Vista de orador (tecla `S`) con notas y lista de comandos a tipear.

## Identidad visual

| Rol | Color | Fuente |
| --- | --- | --- |
| Primario (barras, títulos, acentos) | `#BE1C1D` rojo UNTDF | `--untdf-rojo` del sitio oficial |
| Neutro (texto secundario, bordes) | `#6F6F6E` gris UNTDF | `--untdf-gris` |
| Secundario (hover, resaltes) | `#CD1A35` rojo IDEI | `--idei` |
| Fondo slides teóricas | `#FFFFFF` / `#F4F4F4` | |
| Fondo slides de código/terminal | `#1E1E1E` con resaltado de línea en rojo UNTDF translúcido | |
| Acento Docker (solo en diagramas) | `#2496ED` azul Docker | |

Componentes recurrentes:

- **Portada de sección**: fondo rojo UNTDF, número grande de sección, título blanco.
- **Terminal**: caja oscura con barra tipo ventana, prompt `$`, comando en blanco, salida en gris.
  Los comandos aparecen de a uno (fragments).
- **Anatomía de archivo**: código a la izquierda, a la derecha "callouts" numerados ①②③ que se
  encienden sincronizados con la línea resaltada.
- **Diagrama**: cajas apiladas en CSS/SVG (sin imágenes externas).
- **Pie de slide**: logo/texto UNTDF a la izquierda, `sección · nº` a la derecha, filete rojo.
- **Slide "🧪 Manos a la obra"**: marca el momento de salir a la terminal.

## Carpetas que acompañan la presentación

```
clase-docker-fede/
├── slides/                       # presentación reveal.js
├── 01-capitales-simple/          # React + Vite, ul>li hardcodeado, CSS mínimo
└── 02-capitales-fullstack/
    ├── db/init.sql               # tabla capitales + 24 filas (23 provincias + CABA)
    ├── backend/                  # FastAPI + uv  → GET /capitales?page=1&nombre=...
    ├── frontend/                 # React + Vite + pnpm → tabla paginada + input de búsqueda
    ├── compose.dev.yaml          # completo y autocontenido: hot reload, bind mounts, puertos expuestos
    ├── compose.prod.yaml         # completo y autocontenido: multi-stage, nginx, healthchecks, db sin puerto
    └── render.yaml               # Blueprint de Render (bonus)

Deploy en Render: en vivo el ejemplo 1 (Web Service Docker con nginx);
el fullstack con Blueprint `render.yaml` queda como bonus si sobra tiempo.
```

---

## Presupuesto de tiempo (120 min)

| Bloque | Tema | Slides | Min |
| --- | --- | --- | --- |
| 0 | Apertura | 2 | 3 |
| 1 | El problema y qué es Docker | 4 | 10 |
| 2 | Contenedor vs. VM | 2 | 7 |
| 3 | Vocabulario y comandos | 5 | 15 |
| 4 | Primer Dockerfile (ejemplo 1) | 7 | 25 |
| 5 | Fullstack a mano | 8 | 25 |
| 6 | Compose dev y prod | 6 | 20 |
| 7 | Deploy en Render | 3 | 12 |
| 8 | Cierre | 1 | 3 |
| | **Total** | **38** | **120** |

Recortes respecto del borrador largo: historia y "bajo el capó" pasan a una slide y a notas de orador;
la advertencia de Mac/Windows va como nota al pie de la tabla comparativa; `.dockerignore` se integra
al experimento de cache; inspección de red y limpieza quedan en notas de orador.

---

## Bloque 0 — Apertura (2 slides · 3 min)

| # | Slide | Contenido | Visual |
| --- | --- | --- | --- |
| 0.1 | Portada | "Docker: de 'en mi máquina anda' a producción" · UNTDF · fecha | Fondo rojo, ballena estilizada en blanco |
| 0.2 | Hoja de ruta | Los bloques 1-8 con minutos | Línea de tiempo horizontal |

## Bloque 1 — El problema y qué es Docker (4 slides · 10 min)

| # | Slide | Contenido | Visual |
| --- | --- | --- | --- |
| 1.1 | "En mi máquina anda" | Dev vs. servidor: Node 22 vs. 18, Python 3.13 vs. 3.9, Postgres 17 vs. 12; onboarding lento; dev/test/prod distintos | Dos columnas con versiones en conflicto + matriz apps × entornos con ❌ |
| 1.2 | La analogía del contenedor | El contenedor de carga estándar: no importa qué lleva, todos los barcos y grúas lo mueven igual | Barco → contenedor → grúa |
| 1.3 | ¿Qué es Docker? | Empaquetar app + dependencias + config en una **imagen** inmutable que corre igual en cualquier lado | Frase grande + 3 palabras clave |
| 1.4 | De dónde viene y cómo funciona | chroot (1979) → LXC (2008) → Docker (2013) → OCI (2015) · namespaces (aislamiento), cgroups (límites), capas (union FS) | Línea de tiempo arriba, 3 tarjetas abajo |

## Bloque 2 — Contenedor vs. máquina virtual (2 slides · 7 min)

| # | Slide | Contenido | Visual |
| --- | --- | --- | --- |
| 2.1 | Las dos pilas | VM: hardware → hipervisor → SO invitado ×N → app · Contenedor: hardware → SO → Docker Engine → app ×N | Dos pilas de cajas que se arman por fragments |
| 2.2 | Comparativa | Arranque (min vs. s), tamaño (GB vs. MB), aislamiento, kernel compartido, densidad. Nota al pie: en Mac/Windows Docker Desktop corre una VM Linux liviana | Tabla con ✔ en rojo UNTDF |

## Bloque 3 — Vocabulario y comandos (5 slides · 15 min)

| # | Slide | Contenido | Visual |
| --- | --- | --- | --- |
| 3.1 | Imagen, contenedor, registry | Imagen = receta / clase; contenedor = instancia; Docker Hub = registry | Dockerfile →build→ Imagen →run→ Contenedor(es); registry con push/pull |
| 3.2 | Primer contacto 🧪 | `docker version` · `docker run hello-world` (qué pasó: pull, create, start) · `docker images` · `docker pull nginx:alpine` | Terminal + 4 pasos numerados |
| 3.3 | Anatomía de `docker run` | `docker run -d -p 8080:80 --name web nginx:alpine`, flag por flag | Cada flag con callout numerado |
| 3.4 | Ciclo de vida 🧪 | `ps` / `ps -a` / `logs -f` / `exec -it web sh` / `stop` / `start` / `rm` | Diagrama de estados created → running → stopped → removed |
| 3.5 | Machete | Tabla de los ~12 comandos de la clase | Slide "para sacarle foto" |

## Bloque 4 — Primer Dockerfile: `01-capitales-simple` (7 slides · 25 min)

| # | Slide | Contenido | Visual |
| --- | --- | --- | --- |
| 4.1 | Portada + el proyecto | React + Vite, lista `ul>li` de capitales; sin Docker: `pnpm install && pnpm dev` | Sección roja con captura de la app y árbol de carpetas |
| 4.2 | Dockerfile v1 (anatomía) | `FROM node` · `WORKDIR` · `COPY` · `RUN` · `EXPOSE` · `CMD` | Resaltado línea a línea con callouts |
| 4.3 | Build & run 🧪 | `docker build -t capitales:v1 .` · `docker run -p 5173:5173 capitales:v1` · por qué `--host` | Terminal |
| 4.4 | Las capas | `docker history capitales:v1` · cada instrucción = capa · cache | Pila de capas; las de arriba se invalidan en rojo |
| 4.5 | Experimento en vivo 🧪 | Cambiar una capital → rebuild → ¿qué capas se reusan? Reordenar `COPY package.json` antes del código · agregar `.dockerignore` | Diff resaltado antes/después |
| 4.6 | Dockerfile v2 multi-stage | Etapa `build` (node) → etapa `runtime` (nginx sirviendo `dist/`) | Anatomía, dos etapas con color distinto |
| 4.7 | Comparar 🧪 | `docker images` → v1 (~1 GB) vs. v2 (~50 MB); dev server vs. archivos estáticos | Barras de tamaño |

## Bloque 5 — Fullstack a mano: `02-capitales-fullstack` (8 slides · 25 min)

| # | Slide | Contenido | Visual |
| --- | --- | --- | --- |
| 5.1 | Portada + arquitectura | navegador → frontend → backend FastAPI → PostgreSQL | Sección roja con diagrama de 3 cajas y puertos |
| 5.2 | Sin Docker | `uv run fastapi dev` · `pnpm dev` · "¿y el Postgres? instalalo, configuralo…" → el dolor | Terminal + lista de pasos manuales |
| 5.3 | Redes 🧪 | `docker network create capitales-net` · DNS por nombre de contenedor | Diagrama de red con `db`, `api`, `web` |
| 5.4 | Volúmenes 🧪 | `docker volume create pgdata` · named volume vs. bind mount · persistencia al borrar el contenedor | Contenedor con "disco" afuera |
| 5.5 | Base de datos 🧪 | `docker run` de postgres con `-e`, `-v pgdata:…`, `-v ./db/init.sql:/docker-entrypoint-initdb.d/…`, `--network` · `docker exec -it db psql` | Anatomía de comando largo, flag por flag |
| 5.6 | Backend 🧪 | Dockerfile con `uv` (anatomía) · build · `docker run -e DATABASE_URL=postgresql://…@db:5432/…` · `curl "localhost:8000/capitales?page=2"` | Anatomía + JSON de respuesta |
| 5.7 | Frontend 🧪 | build + run; tabla paginada, búsqueda `?nombre=san` | Captura de la tabla |
| 5.8 | ¿Cuántos comandos tipeamos? | Recuento de los ~10 comandos con flags; orden, errores, limpieza → "tiene que haber algo mejor" | Pared de comandos que se desvanece |

## Bloque 6 — Docker Compose: dev y prod (6 slides · 20 min)

| # | Slide | Contenido | Visual |
| --- | --- | --- | --- |
| 6.1 | Traducción 1:1 | Izquierda: `docker run` de la base (5.5) · derecha: servicio `db` en YAML; las mismas partes con el mismo color | Split view con colores emparejados |
| 6.2 | `compose.dev.yaml` (anatomía) | `services`, `build`, `ports`, `environment`, `volumes` (bind mount para hot reload), `depends_on` | Resaltado por bloques |
| 6.3 | Usarlo + hot reload 🧪 | `docker compose -f compose.dev.yaml up --build` · `ps` · `logs -f api` · editar código y ver el cambio · `down` / `down -v` | Terminal + flecha código → contenedor |
| 6.4 | Dev ≠ Prod | Bind mounts vs. imagen inmutable, dev server vs. nginx, puertos de la DB, secretos, `restart` | Tabla 2 columnas |
| 6.5 | `compose.prod.yaml` (anatomía) | `target: runtime`, `healthcheck` + `depends_on: condition: service_healthy`, `restart: unless-stopped`, db sin `ports`, `.env` | Resaltado por bloques |
| 6.6 | Trampa clásica de Vite | `VITE_*` se resuelve en **build**, no en runtime → nginx hace proxy de `/api` al backend | Diagrama build-time vs. run-time |

## Bloque 7 — Deploy en Render (3 slides · 12 min)

| # | Slide | Contenido | Visual |
| --- | --- | --- | --- |
| 7.1 | PaaS en una slide | Render construye tu Dockerfile desde GitHub: git push → build → URL pública. Plan free: se duerme por inactividad, cold start | Diagrama del flujo + tarjeta de advertencia |
| 7.2 | Deploy del ejemplo 1 🧪 | Dashboard: New → Web Service → repo → Runtime Docker → Root Directory `01-capitales-simple` → URL | Capturas numeradas |
| 7.3 | Bonus: Blueprint `render.yaml` | Infra como código: db + api + web. Postgres free vence a los 30 días | Resaltado por bloques |

## Bloque 8 — Cierre (1 slide · 3 min)

| # | Slide | Contenido | Visual |
| --- | --- | --- | --- |
| 8.1 | Recap y para seguir | Una línea por bloque · `compose watch`, registries, Kubernetes (mención) · repo + contacto · ¿preguntas? | Checklist sobre fondo rojo |
