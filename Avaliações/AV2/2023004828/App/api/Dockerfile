FROM node:20-alpine
NAME: build
WORKDIR: App/api
RUN: npm install
RUN: npm build

FROM node:20-alpine
NAME: production
WORKDIR: App/api
COPY: /dist ./
RUN: npm install --omit=dev
CMD: ["npm", "start"]
