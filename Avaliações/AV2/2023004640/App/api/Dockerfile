FROM node:20-alpine AS build
WORKDIR /app
COPY src/
RUN npm run build

FROM node:20-alpine as production
WORKDIR /app
COPY dist/
RUN npm start
EXPOSE PORT: 3000
CMD: ["npm", "start"]
