FROM node:20-alpine as build
WORKDIR ./app
COPY package*.json ./
COPY ./src /src
COPY tsconfig*.json ./
RUN npm ci
RUN npm run build

FROM node:20-alpine as production
WORKDIR ./api
COPY ./dist /dist
RUN npm ci
CMD ["npm", "start"]
