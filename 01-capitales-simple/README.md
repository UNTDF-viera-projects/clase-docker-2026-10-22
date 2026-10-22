# 01 · Capitales simple

React + Vite que muestra las capitales de Argentina en una lista `ul > li` con datos hardcodeados
(`src/capitales.js`). Sirve para construir la primera imagen y entender capas y cache.

## Sin Docker

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

## Con Docker, paso a paso

| Archivo | Qué muestra |
| --- | --- |
| `Dockerfile.v1` | La versión ingenua: `COPY . .` antes de instalar → cualquier cambio reinstala todo |
| `Dockerfile.v2` | Mismo resultado, ordenado para aprovechar la cache de capas |
| `Dockerfile` | Multi-stage: build con Node, runtime con nginx (la que se despliega en Render) |

```bash
# v1: servidor de desarrollo de Vite dentro del contenedor
docker build -f Dockerfile.v1 -t capitales:v1 .
docker run --rm -p 5173:5173 capitales:v1        # http://localhost:5173

# ver las capas de la imagen
docker history capitales:v1

# experimento: cambiá "Versión 1" en src/App.jsx, reconstruí y mirá qué pasos dicen CACHED
docker build -f Dockerfile.v1 -t capitales:v1 .
docker build -f Dockerfile.v2 -t capitales:v2 .

# v3: producción con nginx
docker build -t capitales:v3 .
docker run --rm -p 8080:80 capitales:v3          # http://localhost:8080

# comparar tamaños (medido: v1/v2 ≈ 278 MB, v3 ≈ 63 MB)
docker images capitales
```

## Deploy en Render

Ver [`../docs/render.md`](../docs/render.md).
