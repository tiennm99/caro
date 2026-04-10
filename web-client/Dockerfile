# Build stage: Vite production build
FROM node:22-alpine AS build
WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js ./
COPY public public
COPY src src
RUN npm run build

# Runtime stage: nginx serves static assets
FROM nginx:alpine
COPY --from=build /build/dist /usr/share/nginx/html

EXPOSE 80
