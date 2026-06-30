FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
COPY --from=build /app/api/dist ./dist
CMD ["npm", "start"]
