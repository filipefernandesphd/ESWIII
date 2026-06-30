# Etapa 1: build - gera a versão de produção do Vite
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Modo "dev" faz o Vite carregar o web/.env.dev (VITE_API_URL)
RUN npm run build -- --mode dev

# Etapa 2: production - serve os arquivos estáticos com Nginx
FROM nginx:alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
