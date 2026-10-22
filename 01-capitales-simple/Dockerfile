# v3: multi-stage, lista para producción

# ---------- Etapa 1: build (Node + pnpm) ----------
FROM node:24-alpine AS build

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
# Genera los archivos estáticos en /app/dist
RUN pnpm build

# ---------- Etapa 2: runtime (solo nginx + estáticos) ----------
FROM nginx:alpine AS runtime

# Copiamos únicamente el resultado del build: nada de Node ni node_modules
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
# nginx:alpine ya define su CMD, no hace falta repetirlo
