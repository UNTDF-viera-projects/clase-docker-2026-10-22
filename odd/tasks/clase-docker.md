# Clase Docker UNTDF — ejemplos y presentación

Material para una clase introductoria de Docker (2 h): dos proyectos de ejemplo y slides reveal.js.
Storyboard aprobado en `storyboard.md` (38 slides). Commits locales en `main` (repo sin remoto).

## Specs

- S1 Ejemplo simple aislado: "una carpeta aislada con un proyecto React Vite que simplemente muestre las capitales de argentina en una lista ul>li con datos hardcodeados. y con CSS mínimo." Con Dockerfile para "modificar los archivos y revisir la imagen".
- S2 Backend: "un fastapi muy simple que se conecte a una base de datos postgresql que tienen una única tabla con las capitales de Argentina y un endpoint /capitales para consultarlas que tiene paginado de 5 y posibilidad de buscar por nombre."
- S3 Frontend: "un pequeño frontend hecho en React con Vite Que permita consultar el endpoint y muestre el resultado de una tabla que esté paginada y permita con un input filtrado por nombre (vía api)."
- S4 "Ademas del docker, deberían poder levantarse con pnpm y uv"
- S5 "Todo eso debería estar con sus respectivos Docker y Docker Compose, tanto para modo de desarrollo como para modo de producción." Decisión: dos archivos autocontenidos `compose.dev.yaml` y `compose.prod.yaml`.
- S6 "sumar el poder hacer el deploy a render ... Aunque sea como mínimo solo el frontend". Decisión: ejemplo 1 como Web Service Docker en vivo + `render.yaml` Blueprint fullstack como bonus.
- S7 Presentación HTML (reveal.js offline) según `storyboard.md`, colores UNTDF (#BE1C1D, #6F6F6E, #CD1A35), comandos y Dockerfiles con partes señaladas, 2 horas.
- S8 Comentarios del código de ejemplo en español.

## Tasks

- [x] T1 S1,S4,S8 — 01-capitales-simple (app + Dockerfile v1/v2 + .dockerignore) — inline — commit: (ver git log, "feat(simple)")
- [x] T2 S2,S4,S8 — 02 db/init.sql + backend FastAPI/uv + Dockerfile — inline — commit: "feat(fullstack): add Postgres seed and FastAPI"
- [ ] T3 S3,S4,S8 — 02 frontend React/pnpm + Dockerfile + nginx — inline — commit:
- [ ] T4 S5 — compose.dev.yaml + compose.prod.yaml + README con comandos manuales — inline — commit:
- [ ] T5 S6 — render.yaml + guía de deploy — inline — commit:
- [ ] T6 S7 — slides reveal.js — inline — commit:
- [ ] T7 S1-S8 — verificación end-to-end (pnpm, uv, docker run, compose dev/prod) — inline

## Log

- L1 (pedido original, resumen del primer mensaje del usuario; texto completo en la sesión): clase introductoria de Docker para Analista/Lic. en Sistemas UNTDF; FastAPI + PostgreSQL (tabla capitales, /capitales paginado de 5, búsqueda por nombre); frontend React+Vite con tabla paginada e input de filtrado vía API; levantables con pnpm y uv; Docker y Docker Compose para dev y prod; deploy a Render (mínimo el frontend); carpeta aislada React Vite con ul>li hardcodeado y CSS mínimo; presentación PPTX o HTML (qué es Docker, por qué, problemas, vs VM, comandos básicos, Dockerfile del ejemplo simple, comandos individuales hasta compose con producción, deploy en Render); estilo con colores UNTDF; storyboard primero.
- L2 Decisiones: 2 horas; compose en dos archivos explícitos; Render ejemplo 1 + Blueprint bonus; comentarios en español.
- L3 Usuario: "me parece bien continuemos" — storyboard aprobado.
