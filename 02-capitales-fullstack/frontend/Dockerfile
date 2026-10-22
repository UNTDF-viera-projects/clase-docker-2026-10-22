# ---------- Base: Node + pnpm + dependencias ----------
FROM node:24-alpine AS base
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

# ---------- Dev: servidor de Vite con recarga en caliente ----------
FROM base AS dev
EXPOSE 5173
CMD ["pnpm", "dev", "--host"]

# ---------- Build: genera los estáticos en /app/dist ----------
FROM base AS build
RUN pnpm build

# ---------- Runtime: nginx sirve los estáticos y hace de proxy a la API ----------
FROM nginx:alpine AS runtime
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
# Valores por defecto; se pueden cambiar con -e al hacer docker run
ENV PORT=80
ENV API_URL=http://api:8000
EXPOSE 80
